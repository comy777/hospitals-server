import { Router } from 'express'
import { check } from 'express-validator'
import { getSpreadSheets } from '../controllers/google'
import { getPages, getQuestionsByPage } from '../controllers/hospital'
import { getResponses, saveResponses } from '../controllers/responses'
import { validateQueries } from '../middlewares/vaidateQueries'

const router = Router()

//Save data spreadsheet
router.get('/spreadsheet', [], getSpreadSheets)

//Get data pages
router.get('/pages', getPages)

//Get data questions by page
router.get('/questions/:id', [
  check('id', 'Not mongo id validate').isMongoId(),
  validateQueries
], getQuestionsByPage)

//Save responses
router.post('/:page', [
  check('page', 'Page not valid').isMongoId(),
  validateQueries
], saveResponses)

//Get all responses
router.get('/responses', getResponses)

export default router