import { EmbedBuilder } from "discord.js"

import { CreatePlayingActionRow } from "@/presentation/messages/components/PlayingActionRow"
import { CreatePausedActionRow } from "@/presentation/messages/components/PausedActionRow"
import { CreateFinishedActionRow } from "@/presentation/messages/components/FinishedActionRow"
import { IEmbedMessageLayout } from "@/domain/type/IEmbedMessageLayout"
import { ISong } from "@/domain/entities/ISong"

export function CreateNowPlayingEmbed(song: ISong) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: 'Now playing:', iconURL: 'https://i.imgur.com/FjnkSIR.jpeg' })
        .setTitle(song.title)
        .setDescription(`requested by: ${song.requested_by}`)
        .setURL(song.url)
        .setImage(song.cover_url)
        .setColor('#4B5A20')
        .setTimestamp()
    ],
    components: [
      CreatePlayingActionRow()
    ]
  } as IEmbedMessageLayout;
}

export function CreatePausedEmbed(song: ISong) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: 'Paused:', iconURL: 'https://i.imgur.com/FjnkSIR.jpeg' })
        .setTitle(song.title)
        .setDescription(`requested by: ${song.requested_by}`)
        .setURL(song.url)
        .setImage(song.cover_url)
        .setColor('#4B5A20')
        .setTimestamp()
    ],
    components: [
      CreatePausedActionRow()
    ]
  } as IEmbedMessageLayout;
}

export function CreateFinishedPlayingEmbed(song: ISong) {
  return {
    embeds: [
      new EmbedBuilder()
        .setAuthor({ name: 'Played previously:', iconURL: 'https://i.imgur.com/FjnkSIR.jpeg' })
        .setTitle(song.title)
        .setDescription(`requested by: ${song.requested_by}`)
        .setURL(song.url)
        .setImage(song.cover_url)
        .setColor('#4B5A20')
        .setTimestamp()
    ],
    components: [
      CreateFinishedActionRow()
    ]
  } as IEmbedMessageLayout;
}
