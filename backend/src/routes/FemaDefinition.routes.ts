import express, { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { FemaDefinition } from '../entity/FemaDefinition.entity'

const router = express.Router()

router.get('/hello-alias', async (req: Request, res: Response) => {
  const fieldName = (req.query.name || '').toString()
  if (!fieldName) {
    res.status(422).send({ errors: ['name of fema definition must be provided'] })
    return
  }
  const result = await AppDataSource.manager.findOneBy(FemaDefinition, {
    fieldName,
  })

  if (!result) {
    res.writeHead(404)
    res.end()
    return
  }

  res.send({ alias: result.fieldAlias })
})

export default router
