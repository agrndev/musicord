import { ISong } from "@/domain/entities/ISong"
import { AudioPlayer } from "@discordjs/voice";

export interface IPlayerService {
  audio_player: AudioPlayer
  play(song: ISong): void;
  resume(): void;
  pause(): void;
  play_next_song(): void;
  playlist(): string;
  quit(): void;
}
