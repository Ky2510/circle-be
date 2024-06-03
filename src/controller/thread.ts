import { Request, Response } from "express";
import * as threadServices from "../service/thread";
import { error } from "console";

export const getThreads = async (req: Request, res: Response) => {
  try {
    const threads = await threadServices.getThreads();

    res.json({
      status: true,
      message: "success",
      data: threads,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getThread = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thread = await threadServices.getThread(+id);

    res.json({
      status: true,
      message: "success",
      data: thread,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const createThread = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.userId = res.locals.user;
    const thread = await threadServices.createThread(
      body,
      req.files as { [fieldname: string]: Express.Multer.File[] }
    );
    res.json({
      status: true,
      message: "success",
      data: thread,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getReplies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const replies = await threadServices.getReplies(+id);

    res.json({
      status: true,
      message: "success",
      data: replies,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const deleteThread = async (req: Request, res: Response) => {
  try {
    const { idThread, userId } = req.params;
    await threadServices.deleteThread(Number(idThread), Number(userId));
    res.json({
      status: true,
      message: "success",
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getUserThreads = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const threads = await threadServices.getUserThreads(userId);
    res.json({
      status: true,
      message: "success",
      data: threads,
    });
  } catch (error) {
    const err = error as unknown as Error;
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
