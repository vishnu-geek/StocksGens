"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/fancy-dark-loading";
import { StockDataDisplay } from "@/components/StockDataDisplay";
import type { StockData } from "@/app/types/StockData";
import { createSupabaseClient } from "@/lib/supaBaseClient";

export default function Page() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const user = params.user as string;
  const id = params.id as string;

  useEffect(() => {
    const loadStockData = async () => {
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

        const data: StockData = await fetchStockData(id);
        console.log(data);
        setStockData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load stock data"
        );
        console.error("Error loading stock data:", err);
      }
    };
    const supabase = createSupabaseClient();

    async function data() {
      setIsLoading(true);
      if (typeof id !== "string") {
        setError("Invalid stock ticker");
        setIsLoading(false);
        return;
      }

      let { data, error } = await supabase
        .from("company")
        .select(`*`)
        .eq("ticker", "AAPL")
        .single();
      console.log(data);
      // console.log(data);
      // if (data) {
      //   let d: StockData = data;
      //   setStockData(d);
      // } else {
      //   let { data: stock, error } = await supabase.from("company").select(id);

      //   if (stock) {
      //     let d: StockData = stock;
      //     setStockData(d);
      //   } else loadStockData();
      // }
      setIsLoading(false);
    }

    data();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stockData) return <Loading />;

  return <StockDataDisplay data={stockData} id ={id} />;
}
