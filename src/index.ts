import 'hard-rejection/register'

import fs from 'fs'
import path from 'path'
import { ApolloServer, gql } from 'apollo-server'

export const server = new ApolloServer({
  resolvers: {},
  typeDefs: gql`
    ${fs.readFileSync(path.join(__dirname, 'schema.gql'))}
  `
})

if (require.main === module) {
  ;(async () => {
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)
  })()
}
