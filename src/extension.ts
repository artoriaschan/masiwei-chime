// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import vscode from "vscode";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { createScheduler } from "./utils";
import type { Scheduler } from "./utils";
import { createNotice } from "./components/notice";

dayjs.locale("zh-cn");
dayjs.extend(localizedFormat);
let scheduler: Scheduler;
export function activate(context: vscode.ExtensionContext): void {
  scheduler = createScheduler(context);
  scheduler.start();

  const disposable = vscode.commands.registerCommand(
    "masiwei-chime.chime",
    () => {
      const notice = createNotice();
      notice.show();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
  // TODO
}
// 监听修改配置
vscode.workspace.onDidChangeConfiguration(function (event) {
  const configList = ["msw.reminder"];
  const affected = configList.some((item) => event.affectsConfiguration(item));
  console.log("onDidChangeConfiguration -> affected: ", affected);
  if (affected) {
    // do some thing ...
    scheduler.restart();
  }
});
