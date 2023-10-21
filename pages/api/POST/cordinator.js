// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const {  cordinator_name, cordinator_role, resources,cordinator_contact, cordinator_github, cordinator_linkedin, cordinator_email} = req.body;

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
      table: "cordinator",
      records: [
        {
          id: uuid,
          cordinator_name:cordinator_name,
          cordinator_role:cordinator_role,
          resources:resources,
          cordinator_contact:cordinator_contact,
          cordinator_github:cordinator_github,
          cordinator_linkedin:cordinator_linkedin,
          cordinator_email:cordinator_email
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
