import { Schema, model } from 'mongoose'
import { ScriptProps } from './script'

const scriptSchema = new Schema<ScriptProps>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['done', 'error'],
      required: true,
      index: true
    },
    duration: Number,
    message: String
  },
  {
    timestamps: true
  }
)

const ScriptModel = model<ScriptProps>('migration', scriptSchema)

export { ScriptModel }
