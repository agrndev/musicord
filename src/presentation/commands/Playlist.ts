import { container } from "tsyringe";

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { DisplayPlaylistUseCase, DisplayPlaylistUseCaseDTO } from "@/application/use-cases/DisplayPlaylist";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { CustomDiscordClient } from "../types/CustomDiscordClient";
import { CreatePlaylistEmbed } from "../messages/Playlist";

export const Playlist = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Display playlist'),

  async execute(interaction: ChatInputCommandInteraction) {
    let input: DisplayPlaylistUseCaseDTO = {
      guild_id: interaction.guildId!
    };
    const res = container.resolve(DisplayPlaylistUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");

    const client = interaction.client as CustomDiscordClient;
    const channel = client.messages_channel.get(input.guild_id);
    if (!channel) {
      message.reply_message(interaction, `Couldn't find the "bot" text channel`)
      return;
    }

    message.send_embed(channel, undefined, CreatePlaylistEmbed(res.description));

    await interaction.deferReply();
    interaction.deleteReply();
  }
} as IDiscordCommand;
