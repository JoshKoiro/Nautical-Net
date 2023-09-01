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

    // TEST without using the API
    saveFile(results)

    return formatData(results);
    
}

function formatData(data) {
    // import data from output.json as a javascript object
    let dataResults = [];
    // const jsonData = JSON.parse(fs.readFileSync(data, 'utf8'));
    data.response.results.map((photo) => {
        dataResults.push({
            src: photo.urls.regular,
            photographer: photo.user.name,
            photographer_url: photo.user.links.html,
            url: photo.urls.regular,
            alt: photo.alt_description
        })
    })
    return dataResults
}

// TEST without using the API
function saveFile(results){
    const json = JSON.stringify(results.response.results)
    fs.writeFileSync('output.json', json)
}

// console.log(formatData('output.json'));