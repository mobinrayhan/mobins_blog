import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, userName, message } = JSON.parse(req.body);

    if (
      !email.trim() ||
      !userName.trim() ||
      !message.trim() ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage = { email, userName, message };

    let client;
    const connectingString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.scfjaom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
      client = await MongoClient.connect(connectingString);
    } catch {
      res.status(500).json({ message: "Could not connected to the database" });
      return;
    }

    const db = client.db(process.env.mongodb_database_name);

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch {
      client.client();
      res.status(500).json({ message: "Storing message failed" });
      return;
    }

    res.status(200).json({
      message: "Successfully created",
      data: newMessage,
    });

    client.close();
  }
}
