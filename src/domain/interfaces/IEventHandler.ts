export interface IEventHandler<T = any> {
  handle(payload: T): Promise<void>;
}
