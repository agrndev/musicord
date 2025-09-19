import { singleton, inject } from "tsyringe";

import { IDiscordVoice } from "@/domain/interfaces/IDiscordVoice"
import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface LeaveServerUseCaseDTO {
  guild_id: string
}

@singleton()
export class LeaveServerUseCase {
  private voice: IDiscordVoice;
  private manager: IPlayerServiceManager;

  constructor(
    @inject("DiscordVoice") voice: IDiscordVoice,
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.voice = voice;
    this.manager = manager;
  }

  execute(input: LeaveServerUseCaseDTO) {
    if (!this.voice.is_connected(input.guild_id)) {
      return {
        title: "[ERROR] LeaveServerUseCase",
        description: "The bot isn't connected to a voice channel",
        type: ResponseType.ERROR
      } as IResponse;
    }

    this.voice.disconnect_from_channel(input.guild_id);
    this.manager.get_audio_player(input.guild_id)?.quit();
    this.manager.delete_audio_player(input.guild_id);

    return {
      title: "[SUCCESS] LeaveServerUseCase",
      description: "Thanks for having me, see you later! ;)",
      type: ResponseType.SUCCESS
    } as IResponse;

  }
}
