"use client";

import { useState, useEffect } from "react";
import PopulationDisplay from "./PopulationDisplay";
import PrefectureDropdown from "./PrefectureDropdown";
import { fetchPopulationData } from "../api/api";
import { Prefecture, PopulationData } from "../types";

type Props = {
  prefectures: Prefecture[];
};

const PrefectureSelector = ({ prefectures }: Props) => {
  const [selectedPrefCode, setSelectedPrefCode] = useState<number | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPrefCode !== null) {
        try {
          const data = await fetchPopulationData(selectedPrefCode);
          setPopulationData(data.result.data);
        } catch (err: any) {
          console.log(err);
          setError(err.message || "エラーが発生しました");
        }
      }
    };
    fetchData();
  }, [selectedPrefCode]);

  //チェックボックスの選択状態を更新
  const handleCheckboxChange = (label: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label) //選択解除
          : [...prev, label] //選択追加
    );
  };

  return (
    <div className="px-5">
      <PrefectureDropdown
        prefectures={prefectures}
        onSelect={(prefCode) => {
          setSelectedPrefCode(prefCode);
        }}
      />

      {error && (
        <p>
          エラー：<span>{error}</span>
        </p>
      )}

      {!error && populationData.length > 0 && (
        <div className="mt-5 mb-2">
          <div className="text-sm font-medium text-gray-700 text-center mb-2">
            表示する項目を選択
          </div>
          <div className="flex justify-center gap-2">
            {populationData.map((category) => (
              <label key={category.label} className="block text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={category.label}
                  checked={selectedCategories.includes(category.label)}
                  onChange={() => handleCheckboxChange(category.label)}
                ></input>
                {category.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {!error && (
        <PopulationDisplay
          populationData={populationData}
          selectedCategories={selectedCategories}
        />
      )}
    </div>
  );
};

export default PrefectureSelector;
