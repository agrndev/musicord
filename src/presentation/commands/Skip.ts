import { container } from "tsyringe";

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { SkipSongUseCase, SkipSongUseCaseDTO } from "@/application/use-cases/SkipSong";

import { IMessageService } from "@/domain/interfaces/IMessageService";

export const Skip = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),

  execute(interaction: ChatInputCommandInteraction) {
    let input: SkipSongUseCaseDTO = {
      guild_id: interaction.guildId!
    };
    const res = container.resolve(SkipSongUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");
    message.reply_message(interaction, res.description);
  }
} as IDiscordCommand;
