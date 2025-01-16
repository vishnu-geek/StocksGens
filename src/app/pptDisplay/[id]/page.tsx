"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/fancy-dark-loading";
import { StockDataDisplay } from "@/components/EditableStockData";
import type { StockData } from "../../types/StockData";
import { createSupabaseClient } from "@/lib/supaBaseClient";

export default function Page() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const supabase = createSupabaseClient();

    async function checkDataInDb() {
      let { data, error } = await supabase.from("company").select("name");

      console.log(data);
    }

    checkDataInDb();
    const loadStockData = async () => {
      if (typeof id !== "string") {
        setError("Invalid stock ticker");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const fetchStockData = async (id: string) => {
          const response = await fetch("/api/stock", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticker: id }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch stock data");
          }
          return await response.json();
        };

        const data = await fetchStockData(id);
        console.log(data);
        setStockData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load stock data"
        );
        console.error("Error loading stock data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStockData();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stockData) return <div>No data available</div>;

  return <StockDataDisplay id={id} data={stockData} />;
}
