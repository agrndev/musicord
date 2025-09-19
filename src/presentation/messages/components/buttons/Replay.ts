import { ButtonBuilder, ButtonStyle } from "discord.js";

export function CreateReplayButton() {
  return new ButtonBuilder()
    .setCustomId('replay')
    .setLabel('Replay')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔄')
}
