import 'hard-rejection/register'

import fs from 'fs'
import path from 'path'
import {
  ApolloServer,
  gql,
  IFieldResolver,
  UserInputError
} from 'apollo-server'

const data = require('../tmp-data/data.json')

export const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, 'schema.gql'))}
`

export const products: IFieldResolver<
  any,
  any,
  GQL.IProductsOnQueryArguments
> = (source, args): GQL.IQuery['products'] => {
  let { offset, limit } = args

  offset = typeof offset !== 'number' ? 0 : offset
  limit = typeof limit !== 'number' ? 20 : limit

  if (limit <= 0 || limit > 40) {
    throw new UserInputError('Pagination arguments invalid', {
      invalidArgs: ['limit']
    })
  } else if (offset < 0) {
    throw new UserInputError('Pagination arguments invalid', {
      invalidArgs: ['offset']
    })
  }

  return {
    __typename: 'ProductsPage',
    items: data.slice(offset, limit + offset),
    limit,
    offset,
    totalProductsCount: data.length
  }
}

export const server = new ApolloServer({
  cors: true,
  playground: true,
  resolvers: {
    Query: {
      products
    }
  },
  typeDefs,
  uploads: false
})

if (require.main === module) {
  ;(async () => {
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)
  })()
}
