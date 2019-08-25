# sample-graphql-product-server

_Sample product data over [GraphQL](https://graphql.org)._

## Prerequisites

* [Node.js](https://nodejs.org/en/) `>=12.9.x` (recommend using
  [nvm](https://github.com/nvm-sh/nvm/) to manage Node.js versions)
* [Yarn](https://yarnpkg.com/en/)
* [Docker](https://www.docker.com) (optional)

## Setup

### Node.js on host machine

1. Clone the repository
2. Install the dependencies:

    ```shell
    cd sample-graphql-product-server
    yarn
    ```
3. Build the server:

    ```shell
    yarn build
    ```

### Docker

You can optionally build and run this project in a Docker container:

```shell
cd sample-graphql-product-server
docker build -t sample-graphql-product-server .
docker run -p 4000:4000 sample-graphql-product-server
```

## Running the server

Start the server using the `start` command:

```shell
yarn start
```

You can then visit [localhost:4000](http://localhost:4000) and browse the
[Apollo GraphQL Playground](https://www.apollographql.com/docs/apollo-server/features/graphql-playground/).

## Development

This project is written in [TypeScript](https://www.typescriptlang.org) and uses
[Apollo Server](https://www.apollographql.com/docs/apollo-server/).
