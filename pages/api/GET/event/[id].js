export default async (req, res) => {
  const { id } = req.query;

  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "sql",
      sql: `SELECT * FROM dev.events WHERE id = '${id}'`,
    }),
  });

  let data = await request.json();
  
  res.status(200).json(data);
};
