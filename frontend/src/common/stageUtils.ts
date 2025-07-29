import { stages } from "./stages";

export const getStageLabelById = (id: string) => {
  return stages.find((s) => s.id === id)?.label || "未設定";
};