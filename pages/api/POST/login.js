// uuid
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { email, mobileno ,username, password } =
    req.body;

  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  let uuid = uuidv4().replace(/-/g, "");

  // check for duplicate usernames in the db
  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "sql",
      sql: `SELECT * FROM dev.users WHERE username = '${username}'`,
    }),
  });

  const data = await request.json();
  if (data.length == 0) return res.sendStatus(401); //Unauthorized 
  const foundUser = data[0];

  // evaluate password 
  const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const email = foundUser.email;
        const displayName = foundUser.firstname + " " + foundUser.lastname;
        res.json({ email, displayName, accessToken });
    } else {
        res.sendStatus(401);
    }
}
