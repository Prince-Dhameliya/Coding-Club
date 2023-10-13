// uuid
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { email, mobileno ,firstname, lastname, username, password, gender, batch, course } =
    req.body;

  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

  let uuid = uuidv4().replace(/-/g, "");

  // check for duplicate usernames in the db
  const duplicate = await fetch(
    `http://localhost:3000/api/GET/users/${username}`,
    {
      method: "GET",
    }
  );
  const isuserexist = await duplicate.json();

  if (isuserexist?.length) return res.status(409).json(); //Conflict 

  //encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);
  const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "dev",
      table: "users",
      records: [
        {
          id: uuid,
          email: email,
          mobileno: mobileno,
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: hashedPwd,
          gender: gender,
          batch: batch,
          course: course,
          roles: {
            'User': 2001,
          }
        },
      ],
    }),
  });

  const data = await request.json();

  res.status(200).json({ 'success': `New user ${username} created!` });
}
