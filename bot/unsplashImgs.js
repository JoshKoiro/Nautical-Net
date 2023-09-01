import 'dotenv/config'
import { createApi } from 'unsplash-js'
import fs from 'fs'

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
})

export async function searchUnsplash(query,num,page) {
    const results = await unsplash.search.getPhotos({
        query: query,
        perPage: num,
        page: page
    })
    // save results as a json file
    const json = JSON.stringify(results.response.results)
    fs.writeFileSync('output.json', json)
    return results
    
}

function formatData(data) {
    // import data from output.json as a javascript object
    let dataResults = [];
    const jsonData = JSON.parse(fs.readFileSync(data, 'utf8'));
    jsonData.map((photo) => {
        let data = {
            src: photo.urls.regular,
            photographer: photo.user.name,
            photographer_url: photo.user.links.html,
            url: photo.urls.regular,
            alt: photo.alt_description
    }
        dataResults.push(data);
    })
    return dataResults
}

console.log(formatData('output.json'));