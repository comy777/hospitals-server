import mongoose from 'mongoose'

export const dbConection = async () => {
  try {
    const base_uri = process.env.MONGO_URI
    const uri = `${base_uri}/hospitals`
    await mongoose.connect(uri)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}