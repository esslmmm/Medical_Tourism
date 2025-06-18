import { format } from "date-fns";

export const formatDate = (
  dateInput?: string | number | Date,
  dateFormat: string = "d MMMM yyyy"
): string => {
  if (!dateInput) return "";

  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return format(date, dateFormat);
  } catch (error) {
    console.error("Invalid date:", dateInput);
    return "";
  }
};