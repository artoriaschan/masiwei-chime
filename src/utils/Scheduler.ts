import vscode from "vscode";
import { CronJob } from "cron";
import { Configuration } from "../config";
import type { Config } from "../config";
import { createNotice } from "../components/notice";

let instance: Scheduler;

class Scheduler {
  private timer: NodeJS.Timeout | null = null;
  private job: CronJob | null = null;
  public constructor(private context: vscode.ExtensionContext) {
    const config = (Configuration.getConfiguration() as unknown) as Config;
    if (config.timing === "clock") {
      this.job = new CronJob(
        "0 * 9-22 * * *",
        () => {
          const notice = createNotice();
          notice.show();
        },
        null,
        true,
        "Asia/Shanghai"
      );
    }
    instance = this;
  }

  start(): void {
    if (this.job) {
      this.job.start();
    } else {
      this.timer = setInterval(() => {
        console.log("start chime");
        const notice = createNotice();
        notice.show();
      }, 1000 * 10);
    }
  }

  stop(): void {
    if (this.job) {
      this.job.stop();
    } else {
      this.timer && clearInterval(this.timer);
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
