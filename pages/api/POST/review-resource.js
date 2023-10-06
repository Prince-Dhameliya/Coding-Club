// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { username, flag, id } = req.body;
  let uuid = uuidv4().replace(/-/g, "");

  await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "update",
      schema: "dev",
      table: "reviews",
      records: [
        {
          id: id,
          reviewedby: {
            reviewed_username: username,
            is_accepted: flag
          }
        },
      ],
    }),
  });

  if(flag) {
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
        },
        body: JSON.stringify({
          operation: "sql",
          sql: `SELECT * FROM dev.reviews WHERE id = '${id}'`,
        }),
      });
    
    const data = await request.json();

    await fetch(process.env.NEXT_PUBLIC_DB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
        },
        body: JSON.stringify({
          operation: "insert",
          schema: "dev",
          table: "resources",
          records: data
        }),
    });

    await fetch(process.env.NEXT_PUBLIC_DB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
        },
        body: JSON.stringify({
          operation: "delete",
          schema: "dev",
          table: "review",
          hash_values: [id]
        }),
    });

    res.status(200).json({'success': "Successfully review Accepted"});
  } else {
    res.status(200).json({'success': "Successfully review Rejected"});
  }
}
