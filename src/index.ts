import 'hard-rejection/register'

import fs from 'fs'
import path from 'path'
import { ApolloServer, gql, IFieldResolver } from 'apollo-server'

const products: IFieldResolver<any, any, GQL.IProductsOnQueryArguments> = (
  source,
  args
): GQL.IQuery['products'] => {
  let { offset, limit } = args

  offset = typeof offset !== 'number' ? 0 : offset
  limit = typeof limit !== 'number' ? 20 : limit

  return {
    __typename: 'ProductsPage',
    items: [],
    limit,
    offset,
    totalProductsCount: 100
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
  typeDefs: gql`
    ${fs.readFileSync(path.join(__dirname, 'schema.gql'))}
  `,
  uploads: false
})

if (require.main === module) {
  ;(async () => {
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)
  })()
}
