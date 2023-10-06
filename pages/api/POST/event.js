// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { event_name,event_url,event_description,event_venue,event_date,event_time,event_resources, addedby } =
    req.body;

  let uuid = uuidv4().replace(/-/g, "");

  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "dev",
      table: "events",
      records: [
        {
          id: uuid,
          event_name: event_name,
          event_url: event_url,
          event_description: event_description,
          event_venue: event_venue,
          event_date: event_date,
          event_time: event_time,
          event_resources: event_resources,
          addedby: addedby,
          participants: []
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
