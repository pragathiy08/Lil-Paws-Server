import { Request } from "express";

export default interface PawRequest extends Request{
    username?: string;
}