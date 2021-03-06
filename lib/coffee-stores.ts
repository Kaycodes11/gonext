// initialize unsplash
import {createApi} from "unsplash-js";


// @ts-ignore
const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_access_key,
})


const getUrlForCoffeeStores = (latLong: string, query: string, limit: number, near = "toronto") => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&near=${near}&client_id=${process.env.NEXT_PUBLIC_client_id}&client_secret=${process.env.NEXT_PUBLIC_client_secret}&v=20220506&limit=${limit}`;
}

// 'https://api.foursquare.com/v3/places/search?query=coffee&near=toronto'

export const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 10
    });
    const unsplashResults = photos.response?.results || [];
    // @ts-ignore
    return unsplashResults.map((result) => result.urls["small"]);
}


// here developer enforcing that process.env.api_key's value never be null or undefined
export const fetchCoffeeStores = async (latLong: string = "43.65267326999575,-79.39545615725015", limit: number = 6): Promise<unknown> => {
    const photos = await getListOfCoffeeStorePhotos();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": process.env.NEXT_PUBLIC_api_key!
    }
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), {headers});
    const data = await response.json();
    console.log(`data:: `, data);
    const venues: any[] = data?.results || [];
    console.log('places:: ', venues);
    return venues.map((venue: any, index: number) => {
        return {...venue, id: venue.fsq_id, imgUrl: photos[index]}
    });
}

