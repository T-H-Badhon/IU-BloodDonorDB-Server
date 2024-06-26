import { Schema, model } from 'mongoose'
import { TBloodRequest } from './bloodRequest.interface'

const bloodRequestSchema = new Schema<TBloodRequest>(
  {
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'donor',
    },
  },
  {
    timestamps: true,
  },
)

export const BloodRequest = model<TBloodRequest>(
  'bloodRequest',
  bloodRequestSchema,
)
