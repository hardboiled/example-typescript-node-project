import 'reflect-metadata'
import { DataSource } from 'typeorm'

const envParams = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(`${process.env.DB_PORT || 3306}`),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'homestead-illy',
  database: process.env.DB_NAME || 'steadily',
}

if (process.env.NODE_ENV === 'test') {
  envParams.database = 'steadily_test'
}

export const AppDataSource = new DataSource({
  ...{
    type: 'mysql',
    synchronize: true,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
    subscribers: [],
  },
  ...envParams,
})
