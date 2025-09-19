import { Readable } from "stream";

export interface ISong {
  requested_by: string,
  url: string,
  title: string,
  duration: number,
  cover_url: string,
  stream: Readable
}
