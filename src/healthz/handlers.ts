import express from "express";
import { Core } from "../core";

export const get = (core: Core) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { db } = core;
  await db.query("select 1", []);
  res.send({
    server: true,
    db: true,
  });
};