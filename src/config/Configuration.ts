import vscode from "vscode";

export interface Config {
  customTemplate: {
    only: boolean;
    tmpls: string[];
  };
  name: string;
  timeFormat: string;
  autoSpeech: boolean;
  extra: {
    before: string;
    after: string;
  };
  reminder: {
    only: boolean;
    times: string[];
  };
}

export class Configuration {
  static getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("msw");
  }
}
