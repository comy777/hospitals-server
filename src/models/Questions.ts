import { model, Schema } from 'mongoose'

const QuestionsSchema = new Schema({
  header: {
    type: String,
    default: ''
  },
  area: {
    type: String,
    required: [true, 'Area is required']
  },
  question: {
    type: String,
    default: ''
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'page',
    required: [true, 'Page id is required']
  }
})

export default model('question', QuestionsSchema)