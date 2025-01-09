import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ asf: "Hello" });
}
