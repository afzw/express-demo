import { Types } from "mongoose"

export interface ScriptProps {
    _id?: Types.ObjectId
    name: string,
    status: 'done' | 'error',
    duration?: number,
    message?: string
}
