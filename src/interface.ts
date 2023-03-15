import * as t from "io-ts";
import { optional, strict } from "io-ts-extra";

export const createUserCodec = strict({
  username: t.string,
  email: t.string,
  accountName: t.string,
  profilePicture: optional(t.string),
});

export interface ICreateUser extends t.TypeOf<typeof createUserCodec> {}

export const updateUserCodec = strict({
  userId: t.number,
  email: optional(t.string),
  accountName: optional(t.string),
  profilePicture: optional(t.string),
});

export interface IUpdateUser extends t.TypeOf<typeof updateUserCodec> {}

export const createChannelCodec = strict({
  name: t.string,
  profilePicture: optional(t.string),
  userId: t.number,
});

export interface ICreateChannel extends t.TypeOf<typeof createChannelCodec> {}

export const updateChannelInfoCodec = strict({
  channelId: t.number,
  name: optional(t.string),
  profilePicture: optional(t.string),
  about: optional(t.string),
});

export interface IUpdateChannelInfo
  extends t.TypeOf<typeof updateChannelInfoCodec> {}
