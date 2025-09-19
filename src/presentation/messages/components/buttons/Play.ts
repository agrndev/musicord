import { ButtonBuilder, ButtonStyle } from "discord.js";

export function CreatePlayButton() {
  return new ButtonBuilder()
    .setCustomId('resume')
    .setLabel('Play')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('▶️')
}
