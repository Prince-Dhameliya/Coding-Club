// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { resource_name, resources, resource_description, resource_type, category, addedby } =
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
      table: "reviews",
      records: [
        {
          id: uuid,
          resource_name: resource_name,
          resources: resources,
          resource_description: resource_description,
          resource_type: resource_type,
          category: category,
          upvotes: [],
          comments: [],
          addedby: addedby,
          reviewedby: {
            reviewed_username: "",
            is_accepted: null
          }
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
