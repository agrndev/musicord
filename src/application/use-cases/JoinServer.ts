import { singleton, inject } from "tsyringe";

import { IDiscordVoice } from "@/domain/interfaces/IDiscordVoice"
import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { IResponse, ResponseType } from "@/domain/entities/IResponse";

export interface JoinServerUseCaseDTO {
  guild_id: string,
  member_id: string
}

@singleton()
export class JoinServerUseCase {
  private voice: IDiscordVoice;
  private manager: IPlayerServiceManager;

  constructor(
    @inject("DiscordVoice") voice: IDiscordVoice,
    @inject("PlayerServiceManager") manager: IPlayerServiceManager,
  ) {
    this.voice = voice;
    this.manager = manager;
  }

  async execute(input: JoinServerUseCaseDTO) {
    let connection = await this.voice.connect_to_channel(input.guild_id, input.member_id);
    if (!connection) {
      return {
        title: "[ERROR] JoinServerUseCase",
        description: "Join a channel before using /join command",
        type: ResponseType.ERROR
      } as IResponse;
    }

    let player = this.manager.create_audio_player(input.guild_id);
    connection?.subscribe(player.audio_player);

    return {
      title: "[SUCCESS] JoinServerUseCase",
      description: "Hey, there! Let's play some music :)",
      type: ResponseType.SUCCESS
    } as IResponse;
  }
}
