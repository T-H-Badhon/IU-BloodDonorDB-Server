import { Schema, model } from 'mongoose'
import { TAdmin } from './admin.interface'

const adminSchema = new Schema<TAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'AB+', 'O+', 'A+', 'B+', 'AB+', 'O+'],
      required: true,
    },
    isDonor: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const Admin = model<TAdmin>('admin', adminSchema)
