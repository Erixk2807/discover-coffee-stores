import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const noSpacesLatLong = latLong.replace(/\s+/g, "");
    const response = await fetchCoffeeStores(noSpacesLatLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.error("Error", err);
    res.status(500);
    res.json({ message: "Something went wrong" });
  }
};

export default getCoffeeStoresByLocation;
