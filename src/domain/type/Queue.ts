import { IQueue } from "@/domain/interfaces/IQueue"

type NodeItem<T> = {
  value: T,
  next?: NodeItem<T>
}

export class Queue<T> implements IQueue<T> {
  private head: NodeItem<T> | undefined;
  private tail: NodeItem<T> | undefined;
  private length: number;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T) {
    const node: NodeItem<T> = { value: item };
    this.length++;

    if (this.length === 1) {
      this.head = this.tail = node;
      return;
    }

    this.tail!.next = node;
    this.tail = node;
  }

  dequeue() {
    if (this.length === 0) {
      return undefined;
    }

    const tmp = this.head;
    this.head = this.head?.next;
    this.length--;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return tmp?.value;
  }

  peek() {
    return this.head?.value;
  }

  is_empty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  to_list() {
    let list: T[] = [];

    let current = this.head;
    while (current != undefined) {
      list.push(current.value);
      current = current.next;
    }

    return list;
  }
}
