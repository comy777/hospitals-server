import { model, Schema } from 'mongoose'

const ResponseSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "page",
    required: [true, "Page is required"]
  },
  responses: {
    type: Schema.Types.Mixed
  }
}, { timestamps: true })

export default model('response', ResponseSchema)