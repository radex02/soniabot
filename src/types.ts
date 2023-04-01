// noinspection JSUnusedGlobalSymbols

import { InteractionResponseType, InteractionType } from "discord-interactions";

export interface Command {
  manifest: DiscordCommandRequest;
  execute: InteractionHandler;
}

export interface DiscordMessage {
  id: string;
  channel_id: string;
  author: Object;
  content: string;
  timestamp: string;
  edited_timestamp?: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: Object[];
  mention_roles: Object[];
  mention_channel?: Object[];
  attachments: Object[];
  embeds: DiscordEmbed[];
  reactions?: Object[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: number;
  activity?: Object;
  application?: Object;
  application_id?: string;
  referenced_message?: DiscordMessage[];
  interaction?: Object;
  thread?: Object;
  components?: DiscordComponent[];
  sticker_items?: Object[];
  stickers?: Object[];
  position?: number;
  role_subscription_data?: Object;
}

export interface DiscordComponent {
  custom_id?: string;
  label?: string;
  style?: number;
  type: number;
  components?: DiscordComponent[];
}

export interface DiscordInteractionData {
  custom_id?: string;
  id: string;
  name: string;
  type: DiscordCommandType;
  options?: DiscordCommandOptionsResponse[];
}

export interface DiscordCommandOptionsResponse {
  name: string;
  type: DiscordCommandOptionType;
  value: string | number;
}

export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: InteractionType;
  data?: DiscordInteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: DiscordMember;
  user?: Object;
  token: string;
  version: number;
  message?: DiscordMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

export interface DiscordMember {
  user: DiscordUser;
}

export interface DiscordUser {
  avatar: string;
  avatar_decoration?: string;
  discriminator: string;
  display_name?: string;
  global_name?: string;
  id: string;
  public_flags: number;
  username: string;
}

export interface InteractionResponse {
  type: InteractionResponseType;
  data?: DiscordResponseMessage;
}

export interface DiscordEmbed {
  color?: number;
  description?: string;
  title?: string;
  url?: string;
  type: string;
  image?: DiscordMedia;
  fields?: DiscordField[];
}

export interface DiscordField {
  name?: string;
  value?: string;
  inline?: boolean;
}

export interface DiscordMedia {
  url?: string;
  proxy_url?: string;
  width?: number;
  height?: number;
}

export interface DiscordResponseMessage {
  tts?: boolean;
  content?: string;
  embeds?: DiscordEmbed[];
  allowed_mentions?: DiscordAllowedMentions;
  flags?: number;
  components?: DiscordComponent[];
  attachments?: Object[];
}

export interface DiscordAllowedMentions {
  parse?: string[];
  roles?: string[];
  users?: string[];
  replied_user?: boolean;
}

export interface DiscordCommandRequest {
  name: string;
  description: string;
  dm_permission?: boolean;
  nsfw?: boolean;
  default_member_permissions?: string;
  type?: DiscordCommandType;
  options?: DiscordCommandOptions[];
}

export interface DiscordCommandOptions {
  type: DiscordCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: DiscordCommandChoices;
  options?: DiscordCommandOptions;
  channel_types?: never;
  min_value?: number;
  max_value?: number;
  max_length: number;
  autocomplete?: boolean;
}

export interface DiscordCommandChoices {
  name: string;
  value: string | number;
}

export enum DiscordCommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export enum DiscordCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

export type InteractionHandler = (
  interaction: DiscordInteraction
) => Promise<InteractionResponse>;
