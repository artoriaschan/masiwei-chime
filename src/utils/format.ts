import dayjs from "dayjs";

export function genDateText(time: Date, format: string): string {
  return dayjs(time).locale("zh-cn").format(format);
}
