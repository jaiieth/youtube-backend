import { Request, Response } from "express";
import { createUserCodec } from "./interface";
import { createUser } from "./resolver";

export const createUserHandler = (req: Request, res: Response) => {
  try {
    const body = req?.body;
    if (createUserCodec.decode(body)._tag === "Right") {
      return createUser(body)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).send(err));
    } else {
      res.status(500).send("Failed To Validate Codec");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

