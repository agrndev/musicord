import { ChatInputCommandInteraction, Message, TextChannel } from "discord.js";

import { ISong } from "@/domain/entities/ISong";
import { IMessageService } from "@/domain/interfaces/IMessageService"
import { IEmbedMessageLayout } from "@/domain/type/IEmbedMessageLayout";

export class MessageService implements IMessageService {
  public embeds: Map<string, Map<ISong, Message>> = new Map<string, Map<ISong, Message>>();

  reply_message(interaction: ChatInputCommandInteraction, message: string) {
    interaction.reply(message);
  }

  send_message(channel: TextChannel, message: string) {
    channel.send(message);
  }

  async send_embed(channel: TextChannel, song: ISong | undefined, layout: IEmbedMessageLayout) {
    let embed = await channel.send(layout);
    if (song) {
      if (!this.embeds.has(channel.id)) {
        this.embeds.set(channel.id, new Map<ISong, Message>());
      }
      this.embeds.get(channel.id)?.set(song, embed);
    }
  }

  edit_embed(channel_id: string, song: ISong, layout: IEmbedMessageLayout) {
    let embed_map = this.embeds.get(channel_id);
    if (!embed_map) {
      return;
    }

    let embed = embed_map.get(song)
    if (!embed) { 
      return;
    }

    embed.edit(layout);
  }
}
