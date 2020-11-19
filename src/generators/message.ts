import random from "random";
import { genDateText } from "../utils";
import { DEFAULT_TMPLS } from "../config/tmpls";

import type { Config } from "../config";

export function generateMessage(config: Config): string {
  const { name, extra, timeFormat, customTemplate } = config;
  const { only, tmpls } = customTemplate;

  const time = genDateText(new Date(), timeFormat);

  let totalTemplates = DEFAULT_TMPLS;

  if (only && tmpls.length > 0) {
    totalTemplates = tmpls;
  } else {
    totalTemplates = totalTemplates.concat(tmpls);
  }

  const index = random.int(0, totalTemplates.length - 1);
  const message = totalTemplates[index]
    .replace(/\$\$name/g, name)
    .replace(/\$\$time/g, time)
    .replace(/\$\$before/g, extra?.before || "")
    .replace(/\$\$after/g, extra?.after || "");

  return message;
}
