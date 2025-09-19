import { container } from "tsyringe";

import { IEventHandler } from "@/domain/interfaces/IEventHandler";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CreateFinishedPlayingEmbed } from "@/presentation/messages/NowPlaying";
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";
import { ISong } from "@/domain/entities/ISong";

export interface FinishedHandlerDTO {
  guild_id: string,
  song: ISong
}

export class FinishedHandler implements IEventHandler {
  async handle(payload: FinishedHandlerDTO) {
    let client: CustomDiscordClient = container.resolve(CustomDiscordClient);
    let channel = client.messages_channel.get(payload.guild_id);
    if (!channel) {
      return;
    }

    let message: IMessageService = container.resolve("MessageService");
    message.edit_embed(channel.id, payload.song, CreateFinishedPlayingEmbed(payload.song));
  }
}
