import { ButtonBuilder, ButtonStyle } from "discord.js"

export function CreatePauseButton() {
  return new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('Pause')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('⏸️')    
}
