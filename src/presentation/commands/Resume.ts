import { container } from "tsyringe";

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { ResumeSongUseCase, ResumeSongUseCaseDTO } from "@/application/use-cases/ResumeSong";

import { IMessageService } from "@/domain/interfaces/IMessageService";

export const Resume = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the song currently paused'),

  async execute(interaction: ChatInputCommandInteraction) {
    const input: ResumeSongUseCaseDTO = {
      guild_id: interaction.guildId!
    };
    const res = container.resolve(ResumeSongUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");
    message.reply_message(interaction, res.description);
  }
} as IDiscordCommand;
