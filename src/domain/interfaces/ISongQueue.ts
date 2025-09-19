import { ISong } from "@/domain/entities/ISong"

export interface ISongQueue {
  enqueue(music: ISong): void;
  dequeue(): ISong | undefined;
  peek(): ISong | undefined;
  is_empty(): boolean;
  size(): number;
  clear(): void;
  to_list(): ISong[]
}
