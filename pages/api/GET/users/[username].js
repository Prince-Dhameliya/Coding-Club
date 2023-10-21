export default async (req, res) => {
    const { username } = req.query;
  
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "sql",
        sql: `SELECT username, roles FROM dev.users WHERE username = '${username}'`,
      }),
    });
  
    let data = await request.json();
    if(data.length === 0) return res.status(404).json([]); 
    data[0].roles = Object.values(data[0].roles);
    res.status(200).json(data);
  };
  