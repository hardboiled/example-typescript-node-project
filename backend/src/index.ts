import express, { Express, Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { FemaDefinition } from './entity/FemaDefinition.entity'

const app: Express = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/hello-alias', async (req: Request, res: Response) => {
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

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
    })
  })
  .catch(console.error)

// import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
