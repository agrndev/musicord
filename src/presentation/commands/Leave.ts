import { container } from "tsyringe"

import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { LeaveServerUseCase, LeaveServerUseCaseDTO } from "@/application/use-cases/LeaveServer";
import { IMessageService } from "@/domain/interfaces/IMessageService";

export const Leave = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Make Musicord leave the voice channel'),

  execute(interaction: ChatInputCommandInteraction) {
    const input: LeaveServerUseCaseDTO = {
      guild_id: interaction.guildId!
    };

    const res = container.resolve(LeaveServerUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");
    message.reply_message(interaction, res.description);
  }
} as IDiscordCommand;
