import { Schema, model } from 'mongoose'
import { TAdmin } from './admin.interface'

const adminSchema = new Schema<TAdmin>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    workingArea: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'AB+', 'O+', 'A+', 'B+', 'AB+', 'O+'],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Admin = model<TAdmin>('admin', adminSchema)
