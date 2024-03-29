import { type Request, type Response } from "express";
import { AuthService } from "../services/AuthService";
import { Tokens } from "../utils/tokens";

const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.createUser(req.body);
    const token = await Tokens.create({ id: user.id });
    res.status(200).json({message: "Not problems", jwt: token});
  } catch (error: any) {
    res.status(500).json({message: "Found problems", error: error.message});
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.loginUser(req.body);
    const token = await Tokens.create({ id: user.id });
    res.status(200).json({message: "Not problems", token: token, type: "Bearer"});
  } catch (error: any) {
    res.status(500).json({message: "Found problems", error: error.message});
  }
};

export const authController = {
  login, register
};