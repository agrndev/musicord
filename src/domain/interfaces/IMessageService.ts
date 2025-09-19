import { ChatInputCommandInteraction, TextChannel } from "discord.js";

import { IEmbedMessageLayout } from "@/domain/type/IEmbedMessageLayout";
import { ISong } from "../entities/ISong";

export interface IMessageService {
  reply_message(interaction: ChatInputCommandInteraction, message: string): void;
  send_message(channel: TextChannel, message: string): void;
  send_embed(channel: TextChannel, song: ISong | undefined, layout: IEmbedMessageLayout): Promise<void>;
  edit_embed(channel_id: string, song: ISong, layout: IEmbedMessageLayout): void;
}
