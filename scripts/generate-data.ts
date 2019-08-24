import Faker from 'faker'

const getRandomProduct = (): GQL.IProduct => {
  const isOnSale = Math.random() > 0.75
  const price = Faker.commerce.price()

  return {
    __typename: 'Product',
    id: Faker.random.uuid(),
    flags: {
      __typename: 'ProductFlags',
      isOnSale,
      isInStock: Math.random() > 0.25
    },
    metadata: {
      __typename: 'ProductMetadata',
      name: Faker.commerce.productName(),
      reviews: {
        __typename: 'ProductMetadataReviews',
        maxRating: 5,
        rating: Faker.random.number({ min: 0, max: 5, precision: 3 }),
        reviewCount: Faker.random.number({ min: 0, max: 100 })
      },
      shortDescription: Faker.lorem.sentence(),
      longDescription:
        Math.random() > 0.5
          ? Faker.lorem
              .paragraphs(Faker.random.number({ min: 2, max: 5 }), '\n\n')
              .split('\n\n')
              .map(p => `<p>${p}</p>\n`)
              .join('')
          : null,
      image:
        Math.random() > 0.125
          ? {
              __typename: 'Image',
              alt: Faker.lorem.words(),
              height: 400,
              uri: Faker.image.imageUrl(400, 400, 'nature', true),
              width: 400
            }
          : null
    },
    price: {
      __typename: 'ProductPrice',
      currency: '$',
      price,
      salePrice: isOnSale
        ? Faker.commerce.price(undefined, parseFloat(price))
        : null
    }
  }
}

console.log(
  JSON.stringify(Array.from(new Array(100)).map(() => getRandomProduct()))
)
