import { PermissionEnum, PrismaClient } from "@prisma/client";
import {
  IAddChannelAdmin,
  ICreateChannel,
  ICreateUser,
  IDeleteVideo,
  IPostVideo,
  ISubscribe,
  IUpdateChannelAdmin,
  IUpdateChannelInfo,
  IUpdateUser,
  IUpdateVideo,
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
                permission,
              },
              create: {
                permission,
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

export const addChannelAdmin = (args: IAddChannelAdmin) => {
  return prisma.channelAdmin.create({
    data: {
      user: {
        connect: {
          id: args.userId,
        },
      },
      channel: {
        connect: {
          id: args.channelId,
        },
      },
      roleName: args.roleName,
      permissions: {
        connectOrCreate: args.permissions.map((permission) => ({
          where: {
            permission,
          },
          create: {
            permission,
          },
        })),
      },
    },
  });
};

export const updateChannelAdmin = async (args: IUpdateChannelAdmin) => {
  const previousPermissions = await prisma.channelAdmin.findFirstOrThrow({
    where: { id: args.channelAdminId },
    select: {
      permissions: true,
    },
  });
  return prisma.channelAdmin.update({
    where: {
      id: args.channelAdminId,
    },
    data: {
      roleName: { set: args.roleName || undefined },
      permissions: {
        disconnect: previousPermissions.permissions.map((data) => ({
          permission: data.permission,
        })),
        connect: args.permissions?.map((permission) => ({
          permission,
        })),
      },
    },
    include: {
      permissions: true,
    },
  });
};

export const subscribe = (args: ISubscribe) => {
  return prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      subscribings: {
        connectOrCreate: {
          where: {
            channelId: args.channelId,
          },
          create: {
            channelId: args.channelId,
          },
        },
      },
    },
    select: {
      id: true,
      subscribings: true,
    },
  });
};

export const unsubscribe = (args: ISubscribe) => {
  return prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      subscribings: {
        disconnect: {
          channelId: args.channelId,
        },
      },
    },
    select: {
      id: true,
      subscribings: true,
    },
  });
};

export const postVideo = (args: IPostVideo) => {
  return prisma.video.create({
    data: {
      channel: {
        connect: {
          id: args.channelId,
        },
      },
      name: args.name,
      description: args.description,
    },
  });
};

export const updateVideo = (args: IUpdateVideo) => {
  return prisma.video.update({
    where: {
      id: args.videoId,
    },
    data: {
      name: args.name || undefined,
      description: args.description || undefined,
    },
  });
};

export const deleteVideo = (args: IDeleteVideo) => {
  return prisma.video.delete({
    where: {
      id: args.videoId,
    },
  });
};
