"use client";

import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { useState } from "react";

interface Prefecture {}

const SimpleLineChart = dynamic(() => import("./Chart/SimpleLineChart"), {
  ssr: false,
});

export function LineCharts() {
  return <SimpleLineChart />;
}

const getPrefecture = async () => {
  const res = await fetch(
    `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures`,
    {
      method: "GET",
      headers: { "x-API-key": "8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ" },
    }
  );
  const data = await res.json();
  console.log(data);
  return data;
};

export default function Page() {
  const [prefectures, setPrefecture] = useState("");
  const [population, setPopulation] = useState("");

  return (
    <>
      <select name="prefecture" id="pref">
        <option value="北海道">北海道</option>
        <option value="青森">青森</option>
        <option value="秋田">秋田</option>
        <option value="岩手">岩手</option>
        <option value="宮城">宮城</option>
        <option value="山形">山形</option>
        <option value="福島">福島</option>
      </select>
    </>
  );
}
