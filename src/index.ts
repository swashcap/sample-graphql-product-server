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
  formatError(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(error)
    }
    return error
  },
  formatResponse(response: any) {
    if (process.env.NODE_ENV !== 'test') {
      /**
       * The playground refreshes the schema every ~1 second. Don't log that.
       */
      if (
        !('data' in response) ||
        typeof response.data !== 'object' ||
        Object.keys(response.data).length !== 1 ||
        Object.keys(response.data)[0] !== '__schema'
      ) {
        console.log(response)
      }
    }
    return response
  },
  introspection: true,
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
