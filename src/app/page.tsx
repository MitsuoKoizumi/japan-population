import PrefectureSelector from "./components/PrefectureSelector";
import { fetchPrefectures } from "./api/api";

const Page = async () => {
  const response = await fetchPrefectures();
  const prefectures = response.result;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        都道府県別人口動態
      </h1>
      <PrefectureSelector prefectures={prefectures} />
    </div>
  );
};

export default Page;
