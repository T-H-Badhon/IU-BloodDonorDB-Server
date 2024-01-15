import { Schema, model } from 'mongoose'
import { TPasswordHistory, TUser } from './user.interface'

const passwordHistorySchema = new Schema<TPasswordHistory>({
  password: {
    type: String,
  },
  usedAt: Date,
})

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['donor', 'admin'],
      required: true,
      default: 'donor',
    },
    phone: {
      type: String,
      required: true,
    },
    passwordChangeAT: Date,
    passwordHistory: passwordHistorySchema,
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
