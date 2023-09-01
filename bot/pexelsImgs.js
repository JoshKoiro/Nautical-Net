import { createClient } from 'pexels';
import 'dotenv/config'
const client = createClient(process.env.PEXELS_API_KEY);

 export async function searchPexels(query,num,page) {
    const results = await client.photos.search({ query, per_page: num, page: page });
    console.log(results);
     return formatData(results);
}

function formatData(results) {
    let endpoint = [];
    results.photos.map((photo) => {
        endpoint.push({
            src: photo.src.large,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url,
            url: photo.url,
            alt: photo.alt
        });
    })
    return endpoint;
}