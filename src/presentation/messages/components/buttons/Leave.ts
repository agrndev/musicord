import { ButtonBuilder, ButtonStyle } from "discord.js"

export function CreateLeaveButton() {
  return new ButtonBuilder()
    .setCustomId('leave')
    .setLabel('Leave')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🛑')
}
