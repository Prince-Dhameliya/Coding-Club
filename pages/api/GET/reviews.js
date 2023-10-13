export default async function handler(req, res) {
  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "sql",
      sql: "SELECT * FROM dev.reviews",
    }),
  });

  const data = await request.json();

  const result = data.filter((review)=> {
    return review.reviewedby.is_accepted === null;
  })

  res.status(200).json(result);
}
