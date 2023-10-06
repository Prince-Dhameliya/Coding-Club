// uuid
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const {  project_name,project_url,technologies,members,project_description,mentor_name,company_information, addedby } = req.body;

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
      table: "projects",
      records: [
        {
          id: uuid,
          project_name:project_name,
          project_url:project_url,
          technologies:technologies,
          mentor_name:mentor_name,
          project_members:members,
          project_description:project_description,
          project_mentor:mentor_name,
          company_information:company_information,
          addedby: addedby,
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ data });
}
