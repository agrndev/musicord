import { container } from "tsyringe"

import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from "discord.js";

import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";
import { JoinServerUseCase, JoinServerUseCaseDTO } from "@/application/use-cases/JoinServer";
import { IMessageService } from "@/domain/interfaces/IMessageService";

export const Join = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Make Musicord join your voice channel'),

  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const input: JoinServerUseCaseDTO = {
      guild_id: interaction.guildId!,
      member_id: member.id
    };

    const res = await container.resolve(JoinServerUseCase).execute(input);

    let message: IMessageService = container.resolve("MessageService");
    message.reply_message(interaction, res.description);
  }
} as IDiscordCommand;
