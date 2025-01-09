import { NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function POST(req) {
  try {
    const body = await req.json();
    const { stockName } = body;

    if (!stockName) {
      return NextResponse.json(
        { error: "Stock name is required" },
        { status: 400 }
      );
    }

    const searchResults = await yahooFinance.search(stockName);

    if (searchResults && searchResults.quotes.length > 0) {
      const validResult = searchResults.quotes.find(
        (quote) => "symbol" in quote
      );

      if (validResult) {
        return NextResponse.json(
          { ticker: validResult.symbol },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "No valid ticker found for the given stock name." },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data from Yahoo Finance" },
      { status: 500 }
    );
  }
}
