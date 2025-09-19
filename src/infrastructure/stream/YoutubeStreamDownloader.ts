import { injectable, singleton } from "tsyringe";

import ytdl from "@distube/ytdl-core"

import { IStreamInfo } from "@/domain/entities/IStreamInfo";
import { IYoutubeStreamDownloader } from "@/domain/interfaces/IYoutubeStreamDownloader";

@singleton()
// @injectable()
export class YoutubeStreamDownloader implements IYoutubeStreamDownloader {
  validate_url(url: string) {
    return ytdl.validateURL(url);
  }

  async get_info(url: string) {
    const res = await ytdl.getBasicInfo(url);
    
    const info: IStreamInfo = {
      title:      res.videoDetails.title,
      cover_url:  res.videoDetails.thumbnails[res.videoDetails.thumbnails.length - 1].url,
      duration:   parseInt(res.videoDetails.lengthSeconds, 10)
    };
    return info;
  }

  get_stream(url: string) {
    return ytdl(
      url,
      {
        filter: "audioonly",
        liveBuffer: 2000,
        highWaterMark: 1 << 25
      }
    );
  }
}
