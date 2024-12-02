import { PopulationData } from "../types";

type Props = {
  populationData: PopulationData[];
  selectedCategories: string[];
};

const PopulationDisplay = ({ populationData, selectedCategories }: Props) => {
  const filterData = populationData.filter((category) =>
    selectedCategories.includes(category.label)
  );

  if (!filterData || filterData.length === 0) {
    return <p className="mt-4 text-sm text-gray-500">人口データがありません</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700">人口データ</h3>
      <ul className="mt-2">
        {filterData.map((item) => (
          <li key={item.label} className="text-sm text-gray-600">
            <strong>{item.label}:</strong>{" "}
            {item.data.map((d) => (
              <span key={d.year}>
                {d.year}年: {d.value.toLocaleString()}人 ({d.rate}%)
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopulationDisplay;
