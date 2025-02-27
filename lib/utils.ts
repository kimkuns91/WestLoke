import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return format(date, "PPP", { locale: ko }); // 예: 2024년 3월 15일
}

export function formatDateTime(date: Date) {
  return format(date, "PPPp", { locale: ko }); // 예: 2024년 3월 15일 오후 3:30
}
