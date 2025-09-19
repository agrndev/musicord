import { container } from "tsyringe";

import { SlashCommandBuilder, GuildMember, ButtonInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { PlaySongUseCase, PlaySongUseCaseDTO } from "@/application/use-cases/PlaySong";
import { CustomDiscordClient } from "../types/CustomDiscordClient";

export const Replay = {
  data: new SlashCommandBuilder()
    .setName('replay')
    .setDescription('Replay a finished song'),

  async execute(interaction: ButtonInteraction) {
    const member = interaction.member as GuildMember;
    const input: PlaySongUseCaseDTO = {
      guild_id: interaction.guildId!,
      member_id: member.id,
      requested_by: interaction.user.displayName,
      url: interaction.message.embeds[0].url!
    };

    await container.resolve(PlaySongUseCase).execute(input);

    const client = interaction.client as CustomDiscordClient;
    const channel = client.messages_channel.get(input.guild_id);
    if (!channel) {
      return;
    }

    await interaction.deferReply();
    interaction.deleteReply();
  }
} as IDiscordCommand;
