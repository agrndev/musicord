import { singleton, inject } from "tsyringe";

import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";

import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface DisplayPlaylistUseCaseDTO {
  guild_id: string
}

@singleton()
export class DisplayPlaylistUseCase {
  private manager: IPlayerServiceManager;

  constructor(
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.manager = manager;
  }

  execute(input: DisplayPlaylistUseCaseDTO) {
    let player = this.manager.get_audio_player(input.guild_id);
    if (!player) {
      return {
        title: "[ERROR] DisplayPlaylistUseCase",
        description: "The bot isn't connected to a voice channel",
        type: ResponseType.ERROR
      } as IResponse;
    }

    let playlist = player.playlist();

    return {
      title: "[SUCCESS] DisplayPlaylistUseCase",
      description: playlist,
      type: ResponseType.ERROR
    } as IResponse;
  }
}
