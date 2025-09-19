import { ISong } from "@/domain/entities/ISong"
import { Queue } from "@/domain/type/Queue"
import { ISongQueue } from "@/domain/interfaces/ISongQueue";

export class InMemorySongQueue implements ISongQueue {
  private queue: Queue<ISong> = new Queue<ISong>();

  enqueue(music: ISong) {
    this.queue.enqueue(music);
  }

  dequeue() {
    return this.queue.dequeue();
  }

  peek() {
    return this.queue.peek();
  }

  is_empty() {
    return this.queue.is_empty();
  }

  size() {
    return this.queue.size();
  }

  clear() {
    this.queue.clear();
  }

  to_list() {
    return this.queue.to_list();
  }
}
