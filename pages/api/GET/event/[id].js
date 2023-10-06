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
        sql: "SELECT * FROM dev.events",
      }),
    });
  
    const data = await request.json();
  
    const result = data.filter((event) => {
      const cheatId = event.id;
      return cheatId.includes(id);
    })[0];
  
    const metaRequest = await fetch(
      `http://localhost:3000/api/META/parser?url=${result.event_url}`,
      {
        method: "GET",
      }
    );
  
    const meta = await metaRequest.json();
  
    const url = new URL(result.event_url);
  
    res.status(200).json({
      id: result.id,
      event_name: result.event_name,
      event_url: result.event_url,
      source: url.origin,
      event_description: meta.meta.event_description,
      event_venue: result.event_venue,
      event_date: result.event_date,
      event_time: result.event_time, 
      event_resources: result.event_resources,
      addedby: result.addedby,
      participants: result.participants
    });
  };
  