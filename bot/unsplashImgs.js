import 'dotenv/config'
import { createApi } from 'unsplash-js'

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
})

export async function searchUnsplash(query,num,page) {
    const results = await unsplash.search.photos({
        query: query,
        perPage: num,
        page: page
    })
    console.log(results)
    
}