"use client";

import { useState } from "react";
import { Prefecture } from "../types";

type Props = {
  prefectures: Prefecture[];
  onSelect: (prefCode: number | null) => void;
};

const PrefectureDropdown = ({ prefectures, onSelect }: Props) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedPrefecture(selectedName);

    const selectedPref = prefectures.find(
      (pref) => pref.prefName === selectedName
    );
    const code = selectedPref ? selectedPref.prefCode : null;

    onSelect(code);
  };

  return (
    <div className="w-64 mx-auto mt-10 text-center">
      <label
        htmlFor="prefecture"
        className="block text-sm font-medium text-gray-700"
      >
        都道府県を選択
      </label>
      <select
        id="prefecture"
        value={selectedPrefecture}
        onChange={handleChange}
        className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">---都道府県を選択してください---</option>
        {prefectures.map((pref) => (
          <option key={pref.prefCode} value={pref.prefName}>
            {pref.prefName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrefectureDropdown;
