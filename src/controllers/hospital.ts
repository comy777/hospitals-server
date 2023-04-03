import { Request, Response } from "express"
import Page from "../models/Page"
import Questions from "../models/Questions"
import { validatePageExists } from "../utils/validateData"

export const savePages = async (page: string): Promise<string | undefined | null> => {
  const validate = await validatePageExists(page)
  if(validate) return
  try {
    const resp = new Page({ title: page })
    await resp.save()
    if(!resp) return
    return resp._id.toString()
  } catch (error) {
    console.log(error)
  }
}

export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await Page.find({})
    return res.status(200).send({ pages })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Error server' })
  }
}


export const getQuestionsByPage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const query = { page: id }
    const questions = await Questions.find(query)
    return res.status(200).send({ questions })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Error server' })
  }
}