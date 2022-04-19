import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    // find a record
    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          // create a record
          if (name) {
            const createRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecord);
            res.json({ records });
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.error("Error finding or finding store", err);
      res.status(500);
      res.json({ message: "Error finding or finding  store", err });
    }
  }
};
export default createCoffeeStore;
