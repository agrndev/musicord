export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  is_empty(): boolean;
  size(): number;
  clear(): void;
  to_list(): T[];
}
