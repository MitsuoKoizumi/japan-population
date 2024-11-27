"use client";

import { Line, LineChart } from "recharts";

export default function LineCharts() {
  const data = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "B", value: 500 },
    { name: "B", value: 600 },
    { name: "B", value: 450 },
    { name: "B", value: 200 },
  ];

  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
}
