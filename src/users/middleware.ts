import { NextFunction, Request, Response } from "express";
import { Handler } from "../api";
import { Core } from "../core";
import { ValidationError } from "../errors";
import { findByEmail } from "./repository";

export const validateCreate = ({ db }: Core): Handler => {
  return async (
    { body: { email = null, password = null } }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const valid = email !== null && password !== null && password.length > 8;
      if (!valid) {
        throw new ValidationError();
      }
      const alreadyExists = await findByEmail(db, email);
      if (alreadyExists) {
        throw new ValidationError();
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
