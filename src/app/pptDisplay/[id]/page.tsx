"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/fancy-dark-loading";
import { StockDataDisplay } from "@/components/EditableStockData";
import type { StockData } from "../../types/StockData";
import { createSupabaseClient } from "@/lib/supaBaseClient";
import { SupabaseClient } from "@supabase/supabase-js";

export default function Page() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const supabase: SupabaseClient = createSupabaseClient();
    const loadStockData = async () => {
      try {
        setIsLoading(true);
        const userid = (await supabase.auth.getUser()).data.user?.email;
        if (userid) setUserId(userid);
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

        const { data: url1, error: err1 } = await supabase
          .from("company")
          .select(data.name)
          .select("url1");
        const { data: url2, error: err2 } = await supabase
          .from("company")
          .select(data.name)
          .select("url2");

        if (!url1) data.url1 = await getImage(data.name);
        else data.url1 = url1.url1;
        if (!url2) data.url2 = await getImage(data.name);
        else data.url2 = url2.url2;

        setStockData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load stock data"
        );
        console.error("Error loading stock data:", err);
      }
      setIsLoading(false);
    };

    loadStockData();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stockData) return <div>No data available</div>;

  return <StockDataDisplay userId={userId} id={id} data={stockData} />;
}

async function getImage(_name: string) {
  const data = { stockName: _name };
  const res = await fetch("/api/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response.imageUrl;
}
