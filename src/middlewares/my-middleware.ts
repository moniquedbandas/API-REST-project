import { Request, Response, NextFunction } from "express";
export function myMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  request.user_id = "12345";
  console.log("Passou pelo middleware");
  return next();
}
