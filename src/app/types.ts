export type PopulationData = {
  label: string;
  data: { year: number; value: number; rate: number }[];
};

export type Prefecture = {
  prefCode: number;
  prefName: string;
};
