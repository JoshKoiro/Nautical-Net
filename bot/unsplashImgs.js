import 'dotenv/config'
import { createApi } from 'unsplash-js'
import fs from 'fs'

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
})

/**
 * Searches Unsplash for photos based on the provided query.
 *
 * @param {string} query - The search query.
 * @param {number} num - The number of photos to retrieve per page.
 * @param {number} page - The page number of the search results.
 * @return {Promise} A promise that resolves to the formatted data of the search results.
 */
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

/**
 * Formats the given data into a specific structure.
 *
 * @param {object} data - The data to be formatted.
 * @return {array} An array of formatted data.
 */
function formatData(data) {
    let dataResults = [];
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