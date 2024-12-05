"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PopulationData } from "../types";

type Props = {
  populationData: PopulationData[];
  selectedCategories: string[];
};

const formatNumber = (value: number): string => value.toLocaleString("en-US");

const PopulationDisplay = ({ populationData, selectedCategories }: Props) => {
  const filterData = populationData.filter((category) =>
    selectedCategories.includes(category.label)
  );

  const chartData = filterData[0]?.data.map((_, index) => {
    const yearData: { [key: string]: number } = {
      year: filterData[0].data[index].year,
    };

    filterData.forEach((category) => {
      yearData[category.label] = category.data[index].value;
    });
    return yearData;
  });

  if (!filterData || filterData.length === 0) {
    return <p className="mt-4 text-sm text-gray-500">人口データがありません</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700">人口データグラフ</h3>
      {chartData && chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis width={80} tickFormatter={formatNumber} />
            <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
            <Legend />
            {filterData.map((category) => (
              <Line
                key={category.label}
                type="monotone"
                dataKey={category.label}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // ランダムカラー
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-4">選択されたデータがありません。</p>
      )}
    </div>
  );
};

export default PopulationDisplay;
