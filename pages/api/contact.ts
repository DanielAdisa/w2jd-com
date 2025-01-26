import { prisma } from "@/lib/prisma"; // Adjust the path to your Prisma client
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      // Save the message to the database
      await prisma.contactMessages.create({
        data: {
          name,
          email,
          message,
        },
      });

      return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error saving message:", error);
      return res.status(500).json({ error: "Failed to send message." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
