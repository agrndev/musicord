import { singleton, inject } from "tsyringe";

import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface ResumeSongUseCaseDTO {
  guild_id: string,
}

@singleton()
export class ResumeSongUseCase {
  private manager: IPlayerServiceManager;

  constructor(
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.manager = manager;
  }

  execute(input: ResumeSongUseCaseDTO) {
    let player = this.manager.get_audio_player(input.guild_id);
    if (!player) {
      return {
        title: "[ERROR] PlaySongUseCase",
        description: "The bot isn't connected to a voice channel",
        type: ResponseType.ERROR
      } as IResponse;
    }

    player.resume();

    return {
      title: "[SUCCESS] PlaySongUseCase",
      description: "Resuming song...",
      type: ResponseType.SUCCESS
    } as IResponse;
  }
}
