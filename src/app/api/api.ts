import { PopulationData } from "../types";
import { Prefecture } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type PrefectureResponse = {
  message: string;
  result: Prefecture[];
};

export type PopulationResponse = {
  message: string;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
};

export const fetchPrefectures = async (): Promise<PrefectureResponse> => {
  const PREFECTURES_ENDPOINT = "/api/v1/prefectures";

  if (!API_KEY) {
    throw new Error("APIキーが設定されていません");
  }

  const response = await fetch(`${API_URL}${PREFECTURES_ENDPOINT}`, {
    method: "GET",
    headers: { "x-api-key": API_KEY },
  });

  if (!response.ok) {
    throw new Error("都道府県データの取得に失敗しました");
  }

  return response.json();
};

export const fetchPopulationData = async (
  prefCode: number
): Promise<PopulationResponse> => {
  const POPULATION_ENDPOINT = `/api/v1/population/composition/perYear?prefCode=${prefCode}`;

  if (!API_KEY) {
    throw new Error("APIキーが設定されていません");
  }

  const response = await fetch(`${API_URL}${POPULATION_ENDPOINT}`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("人口データの取得に失敗しました");
  }

  return response.json();
};
