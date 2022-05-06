const getUrlForCoffeeStores = (latLong: string, query: string, limit: number) => {
    return `https://api.foursquare.com/v2/venues/search?ll=${latLong}&query=${query}&client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&v=20220506&limit=${limit}`;
}

export const fetchCoffeeStores = async (): Promise<unknown> => {
    const response = await fetch(getUrlForCoffeeStores("43.65267326999575,-79.39545615725015", "coffee stores", 6));
    const data = await response.json();
    console.log(`data`, data);
    return data.response.venues;
}
