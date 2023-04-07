import Airtable from "airtable";

export default async function handler(req, res) {
  // Initialize a new Airtable instance
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);

  // Fetch data from an Airtable table
  const records = await base("Services")
    .select({
      sort: [{ field: "Created", direction: "asc" }],
    })
    .all();

  // Map the records to a simpler format
  const data = records.map((record) => ({
    id: record.id,
    // fields: record.fields,
    title: record.fields.Name,
    description: record.fields.Description,
    img: record.fields.Image[0].url,
  }));

  // Send the data as a response
  res.status(200).json(data);
}
