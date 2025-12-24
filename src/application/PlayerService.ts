import { container } from "tsyringe";

import { IPlayerService } from "@/domain/interfaces/IPlayerService";

import { ISong } from "@/domain/entities/ISong";
import { ISongQueue } from "@/domain/interfaces/ISongQueue";
import { InMemorySongQueue } from "@/infrastructure/persistance/InMemorySongQueue";
import { IEventBroker } from "@/domain/interfaces/IEventBroker";
import { AudioPlayer, AudioPlayerStatus, createAudioResource } from "@discordjs/voice";

export class PlayerService implements IPlayerService {
  private queue: ISongQueue = new InMemorySongQueue();
  audio_player: AudioPlayer;
  private guild_id: string;
  private current_song: ISong | undefined;
  private is_playing: boolean = false;

  constructor(guild_id: string, player: AudioPlayer) {
    this.guild_id = guild_id;
    this.audio_player = player;
    this.audio_player.on(AudioPlayerStatus.Idle, () => { this.play_next_song() });
    this.audio_player.on("error", (err) => { console.error(err) })
  }

  play(song: ISong) {
    this.queue.enqueue(song);

    this.send_notification("added", song);

    if (!this.is_playing) {
      this.play_next_song();
    }
  }

  resume() {
    this.is_playing = true;
    this.audio_player.unpause();

    if (this.current_song) {
      this.send_notification("resuming", this.current_song);
    }
  }

  pause() {
    this.is_playing = false;
    this.audio_player.pause();

    if (this.current_song) {
      this.send_notification("pausing", this.current_song);
    }
  }

  play_next_song() {
    this.audio_player.stop();

    if (this.is_playing) {
      this.send_notification("finished", this.current_song!);
    }

    if (this.queue.is_empty()) {
      this.is_playing = false;
      return;
    }

    this.is_playing = true;

    this.current_song = this.queue.dequeue();
    const resource = createAudioResource(this.current_song!.stream);
    this.audio_player.play(resource);

    this.send_notification("playing", this.current_song!);
  }
 
  playlist() {
    let list = this.queue.to_list();
    let playlist: string = "";

    if (this.current_song) {
      playlist += `**now playing: ${this.current_song.title}**\n`;
    }

    for (let i = 0; i < list.length; i++) {
      playlist += `${i + 1}: ${list[i].title}\n`
    }

    return playlist;
  }

  quit() {
    if (this.current_song) {
      this.send_notification("finished", this.current_song!)
    }
  }

  private send_notification(event: string, song: ISong) {
    let broker: IEventBroker = container.resolve("EventBroker");
    broker.emit(event, {
      guild_id: this.guild_id,
      song: song
    });
  }
}
