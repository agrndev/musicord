import { IPlayerService } from "@/domain/interfaces/IPlayerService";

export interface IPlayerServiceManager {
  players: Map<string, IPlayerService>
  get_audio_player(guild_id: string): IPlayerService | undefined;
  create_audio_player(guild_id: string): IPlayerService;
  delete_audio_player(guild_id: string): void;
}
