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
        sql: "SELECT * FROM dev.blogs",
      }),
    });
  
    const data = await request.json();
  
    const result = data.filter((blog) => {
      const cheatId = blog.id;
      return cheatId.includes(id);
    })[0];
  
    const metaRequest = await fetch(
      `http://localhost:3000/api/META/parser?url=${result.img}`,
      {
        method: "GET",
      }
    );
  
    const meta = await metaRequest.json();
  
    const url = new URL(result.img);
  
    // generating image for thumbnail
    const image = () => {
      if (meta.og.images.length) {
        return meta.og.images[0].url;
      } else if (meta.og.image) {
        return meta.og.image;
      } else {
        return ""; // not found image
      }
    };
  
    res.status(200).json({
      id: result.id,
      title: result.title,
      img: image(), // New field for image URL
      desc: result.desc,
      category: result.category,
      author: result.author,
      source: url.origin,
    });
  };
  