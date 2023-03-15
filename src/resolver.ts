import { PermissionEnum, PrismaClient } from "@prisma/client";
import {
  ICreateChannel,
  ICreateUser,
  IUpdateChannelInfo,
  IUpdateUser,
} from "./interface";

export const prisma = new PrismaClient();

export const createUser = (args: ICreateUser) => {
  return prisma.user.create({
    data: {
      username: args.username,
      email: args.email,
      accountName: args.accountName,
      profilePicture: args.profilePicture || undefined,
    },
  });
};

export const updateUser = (args: IUpdateUser) => {
  return prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      email: args.email || undefined,
      accountName: args.accountName || undefined,
      profilePicture: args.profilePicture || undefined,
    },
  });
};

export const createChannel = (args: ICreateChannel) => {
  const defaultPermissions = [
    PermissionEnum.CREATE,
    PermissionEnum.DELETE,
    PermissionEnum.EDIT,
    PermissionEnum.POST,
  ];
  return prisma.channel.create({
    data: {
      name: args.name,
      profilePicture: args.profilePicture || undefined,
      ownedBy: {
        create: {
          user: {
            connect: {
              id: args.userId,
            },
          },
          permissions: {
            connectOrCreate: defaultPermissions.map((permission) => ({
              where: {
                permission: permission,
              },
              create: {
                permission: permission,
              },
            })),
          },
        },
      },
    },
  });
};

export const updateChannelInfo = (args: IUpdateChannelInfo) => {
  return prisma.channel.update({
    where: {
      id: args.channelId,
    },
    data: {
      name: args.name || undefined,
      profilePicture: args.profilePicture || undefined,
      about: args.about || undefined,
    },
  });
};
