import { ButtonBuilder, ButtonStyle } from "discord.js";

export function CreateSkipButton() {
  return new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('Skip')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('⏭️')   
}
