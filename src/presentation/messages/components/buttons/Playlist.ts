import { ButtonBuilder, ButtonStyle } from "discord.js";

export function CreatePlaylistButton() {
  return new ButtonBuilder()
  .setCustomId('playlist')
  .setLabel('Playlist')
  .setStyle(ButtonStyle.Secondary)
  .setEmoji('💽')
}
