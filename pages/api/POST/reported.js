// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { resource_id, addedby, reason, type } = req.body;

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
      table: "reported",
      records: [
        {
          resource_id: resource_id,
          type: type,
          reason: reason,
          addedby: addedby,
          status: "open",
          reviewedby: {
            reviewed_username: ""
          }
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
