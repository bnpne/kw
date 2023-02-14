export default async function (_, res) {
  const client = require('contentful').createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  })

  let allImages = []

  const content = await client.getEntries()
  const entries = content.items

  allImages = entries

  console.log(allImages)

  res.status(200).json(allImages)
}

function getLandingImages() {
  return getItems()
}