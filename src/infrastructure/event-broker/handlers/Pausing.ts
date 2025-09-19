import { container } from "tsyringe";

import { IEventHandler } from "@/domain/interfaces/IEventHandler";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CreatePausedEmbed } from "@/presentation/messages/NowPlaying";
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";
import { ISong } from "@/domain/entities/ISong";

export interface PausingHandlerDTO {
  guild_id: string,
  song: ISong
}

export class PausingHandler implements IEventHandler {
  async handle(payload: PausingHandlerDTO) {
    let client: CustomDiscordClient = container.resolve(CustomDiscordClient);
    let channel = client.messages_channel.get(payload.guild_id);
    if (!channel) {
      return;
    }

    let message: IMessageService = container.resolve("MessageService");
    message.edit_embed(channel.id, payload.song, CreatePausedEmbed(payload.song));
  }
}
