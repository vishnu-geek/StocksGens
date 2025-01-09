import axios from "axios";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

interface BFLResponse {
  id: string;
}

interface BFLResultResponse {
  status: string;
  result?: { sample: string };
}

export async function POST(req: NextRequest) {
  try {
    const { stockName } = await req.json();

    if (!stockName) {
      return NextResponse.json(
        { error: "Stock name is required" },
        { status: 400 }
      );
    }

    const prompt = `${stockName} logo with futuristic city, blue and purple color, neon glow, detailed, high quality. Modern, high tech, soft, bold aesthetic, using dark shades of purple, blue, and black in a gradient`;

    // Generate image request to BFL API
    const generateResponse = await axios.post<BFLResponse>(
      "https://api.bfl.ml/v1/flux-pro-1.1",
      {
        prompt,
        width: 896,
        height: 1152,
      },
      {
        headers: {
          accept: "application/json",
          "x-key": process.env.BFL_API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    const requestId = generateResponse.data.id;

    if (!requestId) {
      return NextResponse.json(
        { error: "No request ID received from BFL API" },
        { status: 500 }
      );
    }

    let imageUrl: string | null = null;
    let status = "Processing";

    // Poll the result from BFL API until the image is ready
    while (status !== "Ready") {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const resultResponse = await axios.get<BFLResultResponse>(
        `https://api.bfl.ml/v1/get_result?id=${requestId}`,
        {
          headers: {
            accept: "application/json",
            "x-key": process.env.BFL_API_KEY!,
          },
        }
      );

      status = resultResponse.data.status;
      if (status === "Ready") {
        imageUrl = resultResponse.data.result?.sample || null;
      }
    }

    if (imageUrl) {
      return NextResponse.json({ imageUrl }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Failed to retrieve the image URL" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error generating or fetching image:", error.message);
    return NextResponse.json(
      { error: "Failed to generate or retrieve image" },
      { status: 500 }
    );
  }
}
