import { singleton, inject } from "tsyringe";


import { IStreamDownloader } from "@/domain/interfaces/IStreamDownloader";
import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";

import { ISong } from "@/domain/entities/ISong";
import { IDiscordVoice } from "@/domain/interfaces/IDiscordVoice";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface PlaySongUseCaseDTO {
  guild_id: string,
  member_id: string,
  requested_by: string,
  url: string
}

@singleton()
export class PlaySongUseCase {
  private downloader: IStreamDownloader;
  private voice: IDiscordVoice;
  private manager: IPlayerServiceManager;

  constructor(
    @inject("StreamDownloader") downloader: IStreamDownloader,
    @inject("DiscordVoice") voice: IDiscordVoice,
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.downloader = downloader;
    this.voice = voice;
    this.manager = manager;
  }
  
  async execute(input: PlaySongUseCaseDTO) {
    if (!this.downloader.validate_url(input.url)) {
      return {
        title: "[ERROR] PlaySongUseCase",
        description: `Invalid url: ${input.url}`,
        type: ResponseType.ERROR
      } as IResponse;
    }

    const song_info = await this.downloader.get_info(input.url);
    const song_stream = this.downloader.get_stream(input.url);

    const song: ISong = {
      requested_by: input.requested_by,
      url: input.url,
      title: song_info.title,
      duration: song_info.duration,
      cover_url: song_info.cover_url,
      stream: song_stream
    };

    let player = this.manager.get_audio_player(input.guild_id);
    if (!player) {
      let connection = await this.voice.connect_to_channel(input.guild_id, input.member_id);
      player = this.manager.create_audio_player(input.guild_id);

      connection?.subscribe(player.audio_player);
    }

    player.play(song);

    return {
      title: "[SUCCESS] PlaySongUseCase",
      description: "Song added",
      value: song,
      type: ResponseType.SUCCESS
    } as IResponse;
  }
}
