import * as vscode from "vscode";
import clipboardy from "clipboardy";
import type { Config } from "../config";
import { Configuration } from "../config";
import { generateMessage } from "../generators/message";

class Notice {
  public message: string;
  public config: Config;

  constructor(
    public btns = ["复制"],
    public renderfn = vscode.window.showInformationMessage
  ) {
    this.config = (Configuration.getConfiguration() as unknown) as Config;
    this.message = generateMessage(this.config);
  }

  render(): void {
    this.renderfn(this.message, ...this.btns).then((res) => {
      if (res === this.btns[0]) {
        clipboardy.writeSync(this.message);
      }
    });
  }

  show(message?: string): void {
    if (message) this.message = message;
    this.render();
  }
}

export function createNotice(btns?: string[], renderfn?: any): Notice {
  // TODO
  return new Notice(btns, renderfn);
}

export type { Notice };
