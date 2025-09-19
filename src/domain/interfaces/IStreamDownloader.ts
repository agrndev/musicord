import { Readable } from "stream";
import { IStreamInfo } from "@/domain/entities/IStreamInfo"

export interface IStreamDownloader {
  validate_url(url: string): boolean;
  get_info(url: string): Promise<IStreamInfo>;
  get_stream(url: string): Readable;
}
