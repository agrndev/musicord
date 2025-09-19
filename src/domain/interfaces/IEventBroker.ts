import { IEventHandler } from "./IEventHandler";

export interface IEventBroker {
  on<T>(event: string, handler: IEventHandler<T>): void;
  emit<T>(event: string, payload: T): void;
}
