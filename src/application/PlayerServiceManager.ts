import { singleton } from "tsyringe";

import { IPlayerServiceManager } from "@/domain/interfaces/IPlayerServiceManager"

import { IPlayerService } from "@/domain/interfaces/IPlayerService"
import { PlayerService } from "@/application/PlayerService"
import { createAudioPlayer } from "@discordjs/voice";

@singleton()
export class PlayerServiceManager implements IPlayerServiceManager {
  players: Map<string, IPlayerService> = new Map<string, IPlayerService>();

  get_audio_player(guild_id: string) {
    return this.players.get(guild_id);
  }

  create_audio_player(guild_id: string) {
    let player = new PlayerService(guild_id, createAudioPlayer());
    this.players.set(guild_id, player);
    return player;
  }

  delete_audio_player(guild_id: string) {
    this.players.delete(guild_id);
  }
}
