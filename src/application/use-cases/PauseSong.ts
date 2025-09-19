import { singleton, inject } from "tsyringe";

import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface PauseSongUseCaseDTO {
  guild_id: string
}

@singleton()
export class PauseSongUseCase {
  private manager: IPlayerServiceManager;

  constructor(
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.manager = manager;
  }

  execute(input: PauseSongUseCaseDTO) {
    let player = this.manager.get_audio_player(input.guild_id);
    if (!player) {
      return {
        title: "[ERROR] PauseSongUseCase",
        description: "The bot isn't connected to a voice channel",
        type: ResponseType.ERROR
      } as IResponse;
    }

    player.pause();

    return {
      title: "[SUCCESS] PauseSongUseCase",
      description: "Pausing song...",
      type: ResponseType.SUCCESS
    } as IResponse;
  }
}
