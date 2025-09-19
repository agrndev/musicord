import { Guild } from "discord.js";
import { IMessageService } from "./IMessageService";

export interface IDiscordBot {
  register_slash_commands(): Promise<void>;
  register_event_handlers(message_service: IMessageService): void;
  map_message_channels(): Promise<void>;
  map_message_channels_by_guilds(guild: Guild): Promise<void>;
  login(): Promise<void>;
}
