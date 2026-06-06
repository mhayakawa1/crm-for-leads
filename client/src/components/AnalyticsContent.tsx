"use client";
import DashboardLink from "./DashboardLink";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/contexts/DataContext";
import { AnalyticsContainer } from "./AnalyticsContainer";
import { useState, useEffect } from "react";
import { url } from "@/contexts/AuthContext";
import { Request } from "@/contexts/DataContext";
import { StatusChart } from "./StatusChart";
import { ConversionChart } from "./ConversionChart";
import { LeadsAddedChart } from "./LeadsAddedChart";

export default function AnalyticsContent() {
  const [leads, setLeads] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const conversions = [
    "New to Contacted",
    "Contacted to Qualified",
    "Qualified to Closed",
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    async function callApi(): Promise<User[]> {
      const newUrl = `${url}users`;
      const request: Request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      try {
        const response = await fetch(newUrl, request);
        const result = (await response.json()) || {};
        if (response.ok) {
          setErrorMessage("");
          setLeads(result);
        } else if (result.error) {
          setErrorMessage(result.error);
        }
        return result;
      } catch {
        setErrorMessage("Server unresponsive");
        return [];
      }
    }
    callApi();
  }, []);

  return (
    <div>
      <DashboardLink />
      <Card className="border border-gray-300 bg-white shadow-sm w-full m-auto max-w-sm h-fit">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {errorMessage.length ? <p>{errorMessage}</p> : null}
          <AnalyticsContainer title="Total leads count">
            <p>{leads.length}</p>
          </AnalyticsContainer>
          <AnalyticsContainer title="">
            <StatusChart leads={leads} />
          </AnalyticsContainer>
          <AnalyticsContainer title="Conversion rate">
            {conversions.map((item) => (
              <ConversionChart key={item} leads={leads} conversion={item} />
            ))}
          </AnalyticsContainer>
          <AnalyticsContainer title="">
            <LeadsAddedChart leads={leads} />
          </AnalyticsContainer>
        </CardContent>
      </Card>
    </div>
  );
}
