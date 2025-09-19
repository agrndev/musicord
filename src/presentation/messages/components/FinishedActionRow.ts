import { ActionRowBuilder } from "discord.js";

import { CreateReplayButton } from "@/presentation/messages/components/buttons/Replay"
import { CreatePlaylistButton } from "@/presentation/messages/components/buttons/Playlist";

export function CreateFinishedActionRow() {
  return new ActionRowBuilder()
    .addComponents(
      CreateReplayButton(),
      CreatePlaylistButton()
    );
}
