import { ISong } from "@/domain/entities/ISong";
import { IEmbedMessageLayout } from "@/domain/type/IEmbedMessageLayout";
import { EmbedBuilder } from "discord.js";

export function CreateAddedToPlaylistEmbed(song: ISong) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: 'Added to playlist:', iconURL: 'https://i.imgur.com/FjnkSIR.jpeg' })
        .setTitle(song.title)
        .setDescription(`requested by: ${song.requested_by}`)
        .setURL(song.url)
        .setImage(song.cover_url)
        .setColor('#4B5A20')
        .setTimestamp()
    ]
  } as IEmbedMessageLayout;
}
