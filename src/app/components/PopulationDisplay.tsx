type PopulationData = {
  label: string;
  data: { year: number; value: number; rate: number }[];
};

type Props = {
  populationData: PopulationData[];
};

const PopulationDisplay = ({ populationData }: Props) => {
  if (!populationData || populationData.length === 0) {
    return <p className="mt-4 text-sm text-gray-500">人口データがありません</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-700">人口データ</h3>
      <ul className="mt-2">
        {populationData.map((item) => (
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
