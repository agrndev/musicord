import { singleton, inject, injectable } from "tsyringe";

import { IDiscordVoice } from "@/domain/interfaces/IDiscordVoice";
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient"

import {
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";

@singleton()
// @injectable()
export class DiscordVoice implements IDiscordVoice {
  private client: CustomDiscordClient;

  constructor(@inject(CustomDiscordClient) client: CustomDiscordClient) {
    this.client = client;
  }

  async connect_to_channel(guild_id: string, member_id: string) {
    const guild = await this.client.guilds.fetch(guild_id);
    const member = await guild.members.fetch(member_id);
    const channel = member.voice.channel;

    if (!channel) {
      console.log(`[ERROR] DiscordVoiceService: ${member.displayName} is not in a voice channel`);
      return undefined;
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild_id,
      adapterCreator: guild.voiceAdapterCreator,
    });

    return connection;
  }

  disconnect_from_channel(guild_id: string) {
    const connection = getVoiceConnection(guild_id);

    if (!connection) {
      console.log(`[ERROR] DiscordVoiceService: Musicord isn't connected in a voice channel on guild with id ${guild_id}`);
      return;
    }

    connection?.destroy();
  }

  is_connected(guild_id: string) {
    return getVoiceConnection(guild_id) != undefined;
  }
}
