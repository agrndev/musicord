import { Interaction } from "discord.js";

import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";
import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";

export function OnInteractionCreateEventHandler(interaction: Interaction) {
  const client = interaction.client as CustomDiscordClient;

  let command: IDiscordCommand | undefined;
  if (interaction.isChatInputCommand()) command = client.commands.get(interaction.commandName);
  if (interaction.isButton())           command = client.commands.get(interaction.customId);
  if (!command)                         return;

  command.execute(interaction);
}
