import { VoiceConnection } from "@discordjs/voice";

export interface IDiscordVoice {
  connect_to_channel(guild_id: string, member_id: string): Promise<VoiceConnection | undefined>;
  disconnect_from_channel(guild_id: string): void;
  is_connected(guild_id: string): boolean;
}
