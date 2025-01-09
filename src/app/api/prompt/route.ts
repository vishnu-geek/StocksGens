import { OpenAI } from "openai";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json(
      { response: response.choices[0].message.content },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { error: "Failed to get GPT response" },
      { status: 500 }
    );
  }
}
