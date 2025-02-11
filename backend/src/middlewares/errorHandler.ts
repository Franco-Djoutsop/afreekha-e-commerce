import { Response, Request } from "express";
import { Constant } from "../constants";

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case Constant.VALIDATION_ERROR:
      res.json({
        error: "true",
        title: "VALIDATION failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case Constant.UNAUTHORIZED:
      res.json({
        error: "true",
        title: "Unauthorized",
        message: err.message,
        starkTrace: err.stack,
      });

    case Constant.NOT_FOUND:
      res.json({
        error: "true",
        title: "Not Found",
        message: err.message,
        starkTrace: err.stack,
      });

    case Constant.FORBIDDEN:
      res.json({
        error: "true",
        title: "Forbidden",
        message: err.message,
        starkTrace: err.stack,
      });

    case Constant.SERVER_ERROR:
      res.json({
        error: "true",
        title: "Server Error",
        message: err.message,
        starkTrace: err.stack,
      });

    default:
      console.log("no Error All good !!");
      break;
  }
  res.json({
    message: err.message,
    starkTrace: err.stack,
  });
};

export default errorHandler;
