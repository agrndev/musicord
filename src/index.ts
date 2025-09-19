import "reflect-metadata"

import { container, Lifecycle } from "tsyringe";

import { config } from "./config"
import { DiscordBot } from "@/presentation/DiscordBot";

import { CustomDiscordClient } from "@/presentation/types/CustomDiscordClient";

import { IDiscordVoice } from "@/domain/interfaces/IDiscordVoice";
import { DiscordVoice } from "@/infrastructure/discord/DiscordVoice";
import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager";
import { PlayerServiceManager } from "@/application/PlayerServiceManager";
import { IMessageService } from "@/domain/interfaces/IMessageService";
import { MessageService } from "@/infrastructure/discord/MessageService";
import { IStreamDownloader } from "@/domain/interfaces/IStreamDownloader";
import { YoutubeStreamDownloader } from "@/infrastructure/stream/YoutubeStreamDownloader";

import { IEventBroker } from "./domain/interfaces/IEventBroker";
import { EventBroker } from "./infrastructure/event-broker/EventBroker";
import { AddedHandler } from "./infrastructure/event-broker/handlers/Added";
import { PlayingHandler } from "./infrastructure/event-broker/handlers/Playing";
import { PausingHandler } from "./infrastructure/event-broker/handlers/Pausing";
import { ResumingHandler } from "./infrastructure/event-broker/handlers/Resuming";
import { FinishedHandler } from "./infrastructure/event-broker/handlers/Finished";

import { JoinServerUseCase } from "@/application/use-cases/JoinServer";
import { LeaveServerUseCase } from "@/application/use-cases/LeaveServer";
import { PlaySongUseCase } from "@/application/use-cases/PlaySong";
import { ResumeSongUseCase } from "@/application/use-cases/ResumeSong";
import { PauseSongUseCase } from "@/application/use-cases/PauseSong";
import { SkipSongUseCase } from "@/application/use-cases/SkipSong";
import { DisplayPlaylistUseCase } from "@/application/use-cases/DisplayPlaylist";

const discord: DiscordBot = new DiscordBot(config.DISCORD_TOKEN, config.APPLICATION_ID);

container.register<CustomDiscordClient>(CustomDiscordClient, { useValue: discord.client });

container.register<IDiscordVoice>("DiscordVoice", { useClass: DiscordVoice }, { lifecycle: Lifecycle.Singleton });
container.register<IPlayerServiceManager>("PlayerServiceManager", { useClass: PlayerServiceManager }, { lifecycle: Lifecycle.Singleton });
container.register<IMessageService>("MessageService", { useClass: MessageService }, { lifecycle: Lifecycle.Singleton });
container.register<IStreamDownloader>("StreamDownloader", { useClass: YoutubeStreamDownloader }, { lifecycle: Lifecycle.Singleton });
container.register<IEventBroker>("EventBroker", { useClass: EventBroker }, { lifecycle: Lifecycle.Singleton });

container.register<JoinServerUseCase>(JoinServerUseCase, { useClass: JoinServerUseCase });
container.register<LeaveServerUseCase>(LeaveServerUseCase, { useClass: LeaveServerUseCase });
container.register<PlaySongUseCase>(PlaySongUseCase, { useClass: PlaySongUseCase });
container.register<ResumeSongUseCase>(ResumeSongUseCase, { useClass: ResumeSongUseCase });
container.register<PauseSongUseCase>(PauseSongUseCase, { useClass: PauseSongUseCase });
container.register<SkipSongUseCase>(SkipSongUseCase, { useClass: SkipSongUseCase });
container.register<DisplayPlaylistUseCase>(DisplayPlaylistUseCase, { useClass: DisplayPlaylistUseCase });

(async () => {
  await discord.register_slash_commands();
  discord.register_button_commands();
  discord.register_event_handlers();
  await discord.login();

  await discord.map_message_channels();

  let broker: IEventBroker = container.resolve("EventBroker");
  broker.on("added", new AddedHandler());
  broker.on("playing", new PlayingHandler());
  broker.on("pausing", new PausingHandler());
  broker.on("resuming", new ResumingHandler());
  broker.on("finished", new FinishedHandler());
})();

