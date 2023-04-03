import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from '../routes/routes'
import { dbConection } from '../database/config'

class Server{
  port: number | string
  app: express.Application
  constructor(){
    this.port = process.env.PORT || 7000
    this.app = express()
    this.db()
    this.middlewares()
    this.routes()
  }

  start(){
    this.app.listen(this.port, () => {
      console.log(`Server on port:${this.port}`)
    })
  }

  middlewares(){
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('dev'))
  }

  routes(){
    this.app.use('/', router)
  }

  async db(){
    await dbConection()
  }

}

export default Server