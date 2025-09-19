import { ActionRowBuilder } from "discord.js";

import { CreatePlayButton } from "@/presentation/messages/components/buttons/Play";
import { CreateSkipButton } from "@/presentation/messages/components/buttons/Skip";
import { CreatePlaylistButton } from "@/presentation/messages/components/buttons/Playlist";
import { CreateLeaveButton } from "@/presentation/messages/components/buttons/Leave";

export function CreatePausedActionRow() {
  return new ActionRowBuilder()
    .addComponents(
      CreatePlayButton(),
      CreateSkipButton(), 
      CreatePlaylistButton(), 
      CreateLeaveButton()
    );
}
