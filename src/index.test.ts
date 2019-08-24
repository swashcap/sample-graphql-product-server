import { validateSchema } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import { typeDefs, products } from './'

const data = require('../tmp-data/data.json')

const callProducts = (args: Parameters<typeof products>[1]) =>
  products(undefined, args, undefined, {} as Parameters<typeof products>[3])

test('valid schema', () => {
  expect(validateSchema(makeExecutableSchema({ typeDefs }))).toEqual([])
})

test('products resolver :: errors', () => {
  expect(() => callProducts({ limit: -1 })).toThrowError()
  expect(() => callProducts({ limit: 41 })).toThrowError()
  expect(() => callProducts({ offset: -1 })).toThrowError()
})

test('products resolver :: success', () => {
  const offset = 2
  const limit = 29
  const response = callProducts({ offset, limit })

  expect(response.offset).toBe(offset)
  expect(response.limit).toBe(limit)
  expect(response.items.length).toBe(limit)
  expect(response.items[0].metadata.name).toBe(data[2].metadata.name)
})
