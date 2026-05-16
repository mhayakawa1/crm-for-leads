"use client";
import { useState, useEffect } from "react";
import { useData } from "@/contexts/DataContext";
// import { User } from "./columns";
import DashboardContent from "./../../components/DashboardContent";
// import { data } from "../[[...slug]]/page";
// async function getData(): Promise<User[]> {
//   const url = "http://localhost:5000/api/users";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const result = await response.json();
//     return result;
//   } catch {
//     return [];
//   }
// }
export default function Dashboard() {
  const [data, setData] = useState([]);

  // const test = useData();
  // useEffect(() => {
  //   async function getData(): Promise<User[]> {
  //     const url = "http://localhost:5000/api/users";
  //     const response = await fetch(url);
  //     console.log(response);
  //     const result = await response.json();

  //     // try {
  //     //   const response = await fetch(url);
  //     //   console.log('response',response)
  //     //   if (!response.ok) {
  //     //     throw new Error(`Response status: ${response.status}`);
  //     //   }
  //     //   const result = await response.json();
  //     //   console.log(result);
  //     setData(result);
  //     return result;
  //     // } catch {
  //     //   return [];
  //     // }
  //   }
  //   getData();
  // }, [setData]);

  return (
    <div className="flex flex-col gap-2 container mx-auto py-10 px-4 border border-solid box-border">
      <DashboardContent />
    </div>
  );
}
