import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls["small"]);
  return photosResponse;
};

export const fetchCoffeeStores = async (
  latLong = "51.551041,-0.148846",
  limit = 6
) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  const photos = await getListOfCoffeeStorePhotos();
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    options
  );
  const data = await response.json();
  return data.results.map((store, index) => {
    return {
      // ...store,
      id: store.fsq_id,
      name: store.name,
      imgUrl: photos[index],
      address: store.location.address || "",
      neighbourhood: store.location.neighbourhood || "",
    };
  });
};
