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
  const [loading, setLoading] = useState<boolean>(false);
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

  return (
    <div>
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

      {!error && <PopulationDisplay populationData={populationData} />}
    </div>
  );
};

export default PrefectureSelector;
