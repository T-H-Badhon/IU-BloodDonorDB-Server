import { Schema, model } from 'mongoose'
import { TPasswordHistory, TUser } from './user.interface'

const passwordHistorySchema = new Schema<TPasswordHistory>({
  password: {
    type: String,
  },
  usedAt: { type: Date },
})

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ['donor', 'admin'],
      required: true,
      default: 'donor',
    },

    passwordChangeAT: {
      type: Date,
    },
    passwordHistory: [passwordHistorySchema],
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<TUser>('user', userSchema)
