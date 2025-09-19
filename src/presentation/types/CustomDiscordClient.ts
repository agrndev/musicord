import { singleton } from "tsyringe";

import { Client, Collection, GatewayIntentBits, TextChannel } from "discord.js";
import { IDiscordCommand } from "@/presentation/types/IDiscordCommand";

@singleton()
export class CustomDiscordClient extends Client {
  commands: Collection<string, IDiscordCommand> = new Collection<string, IDiscordCommand>();
  messages_channel: Map<string, TextChannel> = new Map<string, TextChannel>();

  constructor(intents: GatewayIntentBits[]) {
    super({ intents: intents });
  }
}
