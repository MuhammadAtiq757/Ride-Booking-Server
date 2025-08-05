import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errorHelpers/AppError";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "Access token is required");
      }

      const verifiedToken = verifyToken(
        accessToken,
       "Secret",
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(403, `You are not authorized ${verifiedToken}`);
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "you are not permited to access this route");
      }

      console.log(verifiedToken);
      req.user = verifiedToken;

      next();
    } catch (error) {
      next(error);
    }
  };