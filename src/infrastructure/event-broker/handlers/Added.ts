import { container } from "tsyringe";

import { IEventHandler } from "@/domain/interfaces/IEventHandler";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CreateAddedToPlaylistEmbed } from "@/presentation/messages/AddedToPlaylist";
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";
import { ISong } from "@/domain/entities/ISong";

export interface AddedHandlerDTO {
  guild_id: string,
  song: ISong
}

export class AddedHandler implements IEventHandler {
  async handle(payload: AddedHandlerDTO) {
    let client: CustomDiscordClient = container.resolve(CustomDiscordClient);
    let channel = client.messages_channel.get(payload.guild_id);
    if (!channel) {
      return;
    }

    let message: IMessageService = container.resolve("MessageService");
    await message.send_embed(channel, payload.song, CreateAddedToPlaylistEmbed(payload.song));
  }
}
