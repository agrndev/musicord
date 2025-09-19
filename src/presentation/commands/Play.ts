import { container } from "tsyringe";

import { SlashCommandBuilder, GuildMember, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { PlaySongUseCase, PlaySongUseCaseDTO } from "@/application/use-cases/PlaySong";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CustomDiscordClient } from "../types/CustomDiscordClient";
import { ResponseType } from "@/domain/entities/IResponse";

export const Play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from a YouTube URL')
    .addStringOption(option =>
                     option.setName('url')
                     .setDescription('The YouTube video URL to play')
                     .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const input: PlaySongUseCaseDTO = {
      guild_id: interaction.guildId!,
      member_id: member.id,
      requested_by: interaction.user.displayName,
      url: interaction.options.getString("url")!
    };

    let message: IMessageService = container.resolve("MessageService");

    let res = await container.resolve(PlaySongUseCase).execute(input);

    if (res.type == ResponseType.ERROR) {
      message.reply_message(interaction, res.description);
      return;
    }

    const client = interaction.client as CustomDiscordClient;
    const channel = client.messages_channel.get(input.guild_id);
    if (!channel) {
      message.reply_message(interaction, `Couldn't find the "bot" text channel`)
      return;
    }

    await interaction.deferReply();
    interaction.deleteReply();
  }
} as IDiscordCommand;
