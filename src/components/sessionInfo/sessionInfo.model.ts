import { Schema, model, Types } from 'mongoose'

interface SessionInfoProps {
  _id?: Types.ObjectId
  sessionId?: string,
  userId?: Types.ObjectId
  createAt?: Date
  activeAt?: Date
  expireAt?: Date
  sessionGroupId?: string
  ipAddress?: string
  userAgent?: string
}

const sessionInfoSchema = new Schema<SessionInfoProps>({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  activeAt: {
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    required: true,
    index: true
  },
  sessionGroupId: {
    type: String,
    index: true
  },
  ipAddress: String,
  userAgent: String
})

const SessionInfoModel = model<SessionInfoProps>('sessionInfo', sessionInfoSchema)

export {
  SessionInfoProps,
  SessionInfoModel
}