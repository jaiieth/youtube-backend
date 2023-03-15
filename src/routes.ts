import { createUserHandler } from "./handler";

export const YoutubeRoutes = [
  {
    method: "post",
    path: "/twitter/createUser",
    action: createUserHandler,
  },
];
