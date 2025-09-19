import { ActionRowBuilder } from "discord.js";

import { CreatePauseButton } from "@/presentation/messages/components/buttons/Pause"
import { CreateSkipButton } from "@/presentation/messages/components/buttons/Skip";
import { CreatePlaylistButton } from "@/presentation/messages/components/buttons/Playlist";
import { CreateLeaveButton } from "@/presentation/messages/components/buttons/Leave";

export function CreatePlayingActionRow() {
  return new ActionRowBuilder()
    .addComponents(
      CreatePauseButton(),
      CreateSkipButton(), 
      CreatePlaylistButton(), 
      CreateLeaveButton()
    );
}
