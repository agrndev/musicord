import { IEmbedMessageLayout } from "@/domain/type/IEmbedMessageLayout";
import { EmbedBuilder } from "discord.js";

export function CreatePlaylistEmbed(playlist: string) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: 'Playlist:', iconURL: 'https://i.imgur.com/FjnkSIR.jpeg' })
        .setDescription(playlist)
        .setColor('#4B5A20')
        .setTimestamp()
    ]
  } as IEmbedMessageLayout;
}
