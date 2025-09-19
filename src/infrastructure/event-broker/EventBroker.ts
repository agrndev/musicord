import { IEventHandler } from "@/domain/interfaces/IEventHandler";
import { IEventBroker } from "@/domain/interfaces/IEventBroker";
import { Queue } from "@/domain/type/Queue";

interface QueuedEvent<T = any> {
  event: string;
  payload: T;
};

export class EventBroker implements IEventBroker {
  private handlers: Map<string, Set<IEventHandler>> = new Map<string, Set<IEventHandler>>();
  private queue: Queue<QueuedEvent> = new Queue<QueuedEvent>();
  private isProcessing = false;

  on<T>(event: string, handler: IEventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  emit<T>(event: string, payload: T): void {
    this.queue.enqueue({ event, payload });
    this.process_queue();
  }

  private async process_queue(): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    while (this.queue.size() > 0) {
      const { event, payload } = this.queue.dequeue()!;
      const handlers = this.handlers.get(event) ?? new Set<IEventHandler>();

      for (const handler of handlers) {
        await handler.handle(payload);
      }
    }

    this.isProcessing = false;
  }
}
