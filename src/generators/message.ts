import random from "random";
import { DEFAULT_TMPLS } from "../config/tmpls";
import { genDateText } from "../utils";

import type { Config } from "../config";

export function generateMessage(config: Config): string {
  const { name, extra, timeFormat } = config;
  const time = genDateText(new Date(), timeFormat);
  const index = random.int(0, DEFAULT_TMPLS.length - 1);

  const message = DEFAULT_TMPLS[index]
    .replace(/\$\$name/g, name)
    .replace(/\$\$time/g, time)
    .replace(/\$\$before/g, extra?.before || "")
    .replace(/\$\$after/g, extra?.after || "");

  return message;
}
