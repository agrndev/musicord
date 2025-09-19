import { singleton, inject } from "tsyringe";

import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface SkipSongUseCaseDTO {
  guild_id: string
}

@singleton()
export class SkipSongUseCase {
  private manager: IPlayerServiceManager;

  constructor(
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.manager = manager;
  }

  execute(input: SkipSongUseCaseDTO) {
    let player = this.manager.get_audio_player(input.guild_id);
    if (!player) {
      return {
        title: "[ERROR] SkipSongUseCase",
        description: "The bot isn't connected to a voice channel",
        type: ResponseType.ERROR
      } as IResponse;
    }

    player.play_next_song();

    return {
      title: "[SUCCESS] SkipSongUseCase",
      description: "Skipping song...",
      type: ResponseType.SUCCESS
    } as IResponse;
  }
}
