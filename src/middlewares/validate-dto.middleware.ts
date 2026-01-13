import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDtoMiddleware(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const formatted = errors.reduce(
        (acc, err) => {
          if (err.constraints) {
            acc[err.property] = Object.values(err.constraints)[0];
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      return res.status(400).json({ message: "Validation failed", errors: formatted });
    }

    req.body = dto;
    next();
  };
}
