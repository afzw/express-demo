import { Schema, model, Types } from 'mongoose'

interface ScriptDoc {
  _id?: Types.ObjectId
  name: string,
  status: 'done' | 'error',
  duration?: number,
  message?: string
}

const scriptSchema = new Schema<ScriptDoc>({
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
}, {
  timestamps: true
})

const ScriptModel = model<ScriptDoc>('migration', scriptSchema)

export {
  ScriptDoc,
  ScriptModel
}