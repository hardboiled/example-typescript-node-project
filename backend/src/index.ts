import express from 'express'
import { AppDataSource } from './data-source'
import FemaDefinitionRoutes from './routes/FemaDefinition.routes'
import UnderwritingRoutes from './routes/Underwriting.routes'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/fema_definition', FemaDefinitionRoutes)
app.use('/underwriting', UnderwritingRoutes)

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
