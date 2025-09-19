import { Events, GatewayIntentBits, REST, Routes, TextChannel, Guild, ChannelType } from "discord.js"

import { IDiscordBot } from "@/domain/interfaces/IDiscordBot"
import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient"

import { Join } from "@/presentation/commands/Join"
import { Leave } from "@/presentation/commands/Leave"
import { Pause } from "@/presentation/commands/Pause"
import { Play } from "@/presentation/commands/Play"
import { Playlist } from "@/presentation/commands/Playlist"
import { Resume } from "@/presentation/commands/Resume"
import { Skip } from "@/presentation/commands/Skip"
import { Replay } from "@/presentation/commands/Replay"

import { ClientReadyEventHandler } from "@/presentation/events/ClientReadyEventHandler"
import { OnInteractionCreateEventHandler } from "@/presentation/events/OnInteractionCreateEventHandler"

const INTENTS: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildVoiceStates,
];

export class DiscordBot implements IDiscordBot {
  private token!: string;
  private application_id!: string;
  public client: CustomDiscordClient;

  constructor(token: string, application_id: string) {
    this.token = token;
    this.application_id = application_id;

    this.client = new CustomDiscordClient(INTENTS);
  }

  async register_slash_commands(): Promise<void> {
    console.log("[INFO] DiscordBot: registering slash commands...");

    this.client.commands.set(Join.data.name, Join);
    this.client.commands.set(Leave.data.name, Leave);
    this.client.commands.set(Pause.data.name, Pause);
    this.client.commands.set(Play.data.name, Play);
    this.client.commands.set(Playlist.data.name, Playlist);
    this.client.commands.set(Resume.data.name, Resume);
    this.client.commands.set(Skip.data.name, Skip);

    let commands_array = Array.from(this.client.commands.values()).map(c => c.data.toJSON());

    const rest = new REST().setToken(this.token);

    interface response {
      length: number
    };

    const res = await rest.put(
      Routes.applicationCommands(this.application_id),
      { body: commands_array },
    ) as response;

    console.log(`[INFO] DiscordBot: reloaded ${res.length} (/) commands.`);
  }

  register_button_commands() {
    this.client.commands.set(Replay.data.name, Replay);
  }

  register_event_handlers(): void {
    console.log(`[INFO] DiscordBot: registering event handlers...`);

    this.client.once(Events.ClientReady, ClientReadyEventHandler);
    this.client.on(Events.GuildCreate, (guild) => { this.map_message_channels_by_guilds(guild) });
    this.client.on(Events.InteractionCreate, OnInteractionCreateEventHandler);

    console.log(`[INFO] DiscordBot: event handlers registered.`);
  }

  async map_message_channels() {
    for (const guild of this.client.guilds.cache.values()) {
      let found = false;

      const channels = await guild.channels.fetch();
      channels.forEach((channel) => {
        if (channel!.isTextBased() && channel.name.toLowerCase() === "bot") {
          this.client.messages_channel.set(guild.id, channel as TextChannel);
          found = true;
          return;
        }
      });

      if (!found) {
        guild.channels.create({
          name: "bot",
          type: ChannelType.GuildText,
          topic: "Musicord",
          reason: "To receive Musicord's messages"
        })
      }
    }
  }

  async map_message_channels_by_guilds(guild: Guild) {
    let found = false;

    const channels = await guild.channels.fetch();
    channels.forEach((channel) => {
      if (channel!.isTextBased() && channel.name.toLowerCase() === "bot") {
        this.client.messages_channel.set(guild.id, channel as TextChannel);
        found = true;
        return;
      }
    })

    if (!found) {
      guild.channels.create({
        name: "bot",
        type: ChannelType.GuildText,
        topic: "Musicord",
        reason: "To receive Musicord's messages"
      })
    }
  }

  async login() {
    await this.client.login(this.token);
    console.log(`[INFO] DiscordBot: logged in.`);
  }
}
