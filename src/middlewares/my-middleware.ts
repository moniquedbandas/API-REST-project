import { Request, Response, NextFunction } from "express";
export function myMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("Passou pelo middleware");
  return next();
}
