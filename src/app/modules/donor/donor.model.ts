import { Schema, model } from 'mongoose'
import { TDonor } from './donor.interface'

const donorSchema = new Schema<TDonor>(
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
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
        message: '{VALUE} is not an enum value',
      },
      required: true,
    },
    area: {
      type: String,
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

export const Donor = model<TDonor>('donor', donorSchema)
