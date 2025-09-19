import { container } from "tsyringe";

import { IEventHandler } from "@/domain/interfaces/IEventHandler";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CreateNowPlayingEmbed } from "@/presentation/messages/NowPlaying";
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";
import { ISong } from "@/domain/entities/ISong";

export interface PlayingHandlerDTO {
  guild_id: string,
  song: ISong
}

export class PlayingHandler implements IEventHandler {
  async handle(payload: PlayingHandlerDTO) {
    let client: CustomDiscordClient = container.resolve(CustomDiscordClient);
    let channel = client.messages_channel.get(payload.guild_id);
    if (!channel) {
      return;
    }

    let message: IMessageService = container.resolve("MessageService");
    message.edit_embed(channel.id, payload.song, CreateNowPlayingEmbed(payload.song));
  }
}
