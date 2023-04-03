import { Request, Response } from "express";
import ResponseSchema from "../models/Response";

export const saveResponses = async (req: Request, res: Response) =>{
  const { page } = req.params
  try {
    const responses = new ResponseSchema({ service: page, responses: req.body })
    const respSave = await responses.save()
    return res.status(200).send({ msg: 'save responses' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Error server' })
  }
}

export const getResponses = async (req: Request, res: Response) => {
  try {
    const responses = await ResponseSchema.find({})
    return res.status(200).send({ data: responses })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Error server' })
  }
}