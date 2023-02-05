import { Schema, model } from 'mongoose'
import { SessionInfoProps } from '@/modules/sessionInfo/sessionInfo'

export const sessionInfoSchema = new Schema<SessionInfoProps>(
  {
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    sessionGroupId: {
      type: String,
      index: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
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
    ipAddress: String,
    userAgent: String
  },
  {
    timestamps: true
  }
)

export const SessionInfoModel = model<SessionInfoProps>('sessionInfo', sessionInfoSchema)
