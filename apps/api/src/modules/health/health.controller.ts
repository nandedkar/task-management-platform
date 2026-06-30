import { Request, Response } from "express";
import { HttpStatus } from "../../common/constants/http-status";

export const getHealth = (req: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    success: true,
    message: "Application is healthy",
  });
}