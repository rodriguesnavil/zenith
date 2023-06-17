import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const fileHandler = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, _: Response, next: NextFunction) => {
  console.log(`here `);
  
  if (!req.file) {
    console.log('No file uploaded');
    return next();
  }

  const file = req.file as Express.Multer.File;
  
  const mappedFile = {
      name: file.originalname,
      type: file.mimetype,
      content: file.buffer,
      size: file.size,
      filePath: file.path,
      extension: `${file.originalname.split(".").pop()}`
  };
  
  Object.assign(req.body, { file: mappedFile });
  return next();
};

