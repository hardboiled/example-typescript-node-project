import { FemaDefinition } from './FemaDefinition.entity'
import { AppDataSource } from '../data-source'

describe('FemaDefinition', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })
  afterAll(async () => {
    await AppDataSource.manager.delete(FemaDefinition, {})
    await AppDataSource.destroy()
  })
  describe('#exampleMethodToTest', () => {
    it('returns concatenated timestamps', async () => {
      const entity = AppDataSource.manager.create(FemaDefinition, {
        fieldAlias: 'some alias',
        fieldName: 'name',
        fieldType: 'TYPE',
        length: 2,
        metricType: 'a metric',
        relevantLayer: 'n/a',
        sort: 1,
        version: 'November 2021',
      })

      const result = await AppDataSource.manager.save(entity)

      expect(result.createdAt).not.toBeNull()
      expect(result.updatedAt).not.toBeNull()
      expect(result.exampleMethodToTest()).toBe(`${result.createdAt},${result.updatedAt}`)
    })
  })
})
