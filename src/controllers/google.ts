import { Request, Response } from "express";
import { getAuthSheets } from "../google/config";
import Questions from "../models/Questions";
import { savePages } from "./hospital";

export const getSpreadRows = async (name: string) => {
  try {
    const { googleSheets, auth, spreadSheetId } = await getAuthSheets()
    const data = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId: spreadSheetId,
      range: name
    })
    return data.data.values
  } catch (error) {
    console.log(error)
  }
}

export const getSpreads = async () => {
  try {
    const { googleSheets, auth, spreadSheetId } = await getAuthSheets()
    const data = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId: spreadSheetId
    })
    const sheetsName: string[] = []
    const values: any[] = []
    const promises: any[] = []
    const { sheets } = data.data
    if(!sheets) return
    sheets.forEach((sheet) => {
      if(!sheet.properties) return
      const { title } = sheet.properties
      if(title) {
        promises.push(getSpreadRows(title))
        sheetsName.push(title)
      }
    })
    const resp = await Promise.all(promises)
    resp.forEach((promise, i) => {
      const title = sheetsName[i]
      let data: any
      promise.forEach((value: any) => {
        if(value.includes('PREGUNTA') || value.includes('ENCABEZADO')){
          const [area, servicio, ...res] = value
          const result = value[value.length - 1]
          const header = result === 'ENCABEZADO' ? servicio : ''
          const question = result === 'PREGUNTA' ? servicio : ''
          data = data ? [...data, { area, header, question } ] : [{ area, header, question }] 
        }
      })
      if(data) values.push({ title, data })
    }) 
    return values
  } catch (error) {
    console.log(error)
  }
}

const savePage = async (data: any, contador: number, newValues: any[]) => {
  return new Promise(async (resolve) => {
    const saveData = async (data: any[], contador: number) => {
      let valueContador = contador
      let values: any[] = []
      if(valueContador > data.length - 1) return resolve(values)
      console.log(data.length, contador)
      if(data[valueContador]){
        const { title, data: pages } = data[valueContador]
        const id = await savePages(title)
        valueContador++
        if(id) {
          pages.forEach((value: any) => {
            const area = value.area ? value.area : 'sin area'
            values.push({ ...value, area, page: id })
          })
          await Questions.insertMany(values)
        }
      }
      setTimeout(async () => {
        await saveData(data, valueContador)
      }, 1000);
    }
    await saveData(data, contador)
  })
}

export const getSpreadSheets = async (req: Request, res: Response) => {
  const data = await getSpreads()
  if(!data) return res.status(500).send({ error: 'Error server' })
  let contador = 0
  const newValues: any[] = []
  const resp = await savePage(data, contador, newValues)
  console.log(resp)
  return res.status(200).send({ msg: 'Se han insertado los datos de la hoja de calculo' })
}