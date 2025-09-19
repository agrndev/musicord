import { container } from "tsyringe";

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { PauseSongUseCase, PauseSongUseCaseDTO } from "@/application/use-cases/PauseSong";
import { IMessageService } from "@/domain/interfaces/IMessageService";

export const Pause = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the song currently playing'),

  execute(interaction: ChatInputCommandInteraction) {
    let input: PauseSongUseCaseDTO = {
      guild_id: interaction.guildId!
    };
    const res = container.resolve(PauseSongUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");
    message.reply_message(interaction, res.description);
  }
} as IDiscordCommand;
