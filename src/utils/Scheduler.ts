import vscode from "vscode";
import { CronJob } from "cron";
import { createNotice } from "../components/notice";

let instance: Scheduler;

class Scheduler {
  private timer: NodeJS.Timeout | null = null;
  private job: CronJob | null = null;
  public constructor(private context: vscode.ExtensionContext) {
    instance = this;
  }

  start(): void {
    this.job = new CronJob(
      "0 0 9-22 * * *",
      () => {
        const notice = createNotice();
        notice.show();
      },
      null,
      true,
      "Asia/Shanghai"
    );

    this.job.start();
  }

  stop(): void {
    this.job && this.job.stop();
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
