import vscode from "vscode";
import { CronJob } from "cron";

import { createNotice } from "../components/notice";
import { Configuration } from "../config";

import type { Config } from "../config";
let instance: Scheduler;

class Scheduler {
  private jobs: CronJob[] = [];
  private config: Config;

  public constructor(private context: vscode.ExtensionContext) {
    instance = this;
    this.config = (Configuration.getConfiguration() as unknown) as Config;
  }

  load(): void {
    const { reminder } = this.config;
    if (reminder.only && reminder.times.length > 0) {
      for (const time of reminder.times) {
        const [hours, minutes] = time.split(":");
        const job = new CronJob(
          `0 ${minutes} ${hours} * * *`,
          () => {
            const notice = createNotice();
            notice.show();
          },
          null,
          true,
          "Asia/Shanghai"
        );
        this.jobs.push(job);
      }
    } else {
      const job = new CronJob(
        "0 0 9-22 * * *",
        () => {
          const notice = createNotice();
          notice.show();
        },
        null,
        true,
        "Asia/Shanghai"
      );

      this.jobs.push(job);
    }
  }
  start(): void {
    this.load();
    for (const job of this.jobs) {
      job.start();
    }
  }

  stop(): void {
    for (const job of this.jobs) {
      job.stop();
    }
  }

  static getScheduler(): Scheduler {
    return instance;
  }
}

export function createScheduler(context: vscode.ExtensionContext): Scheduler {
  if (instance) return instance;
  return new Scheduler(context);
}

export type { Scheduler };
