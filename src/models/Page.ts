import { model, Schema } from 'mongoose'

const PageSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title of page is required']
  }
})

export default model('page', PageSchema)