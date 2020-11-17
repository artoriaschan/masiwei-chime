import vscode from "vscode";

export interface Config {
  customTemplateArray: string[];
  name: string;
  timeFormat: string;
  autoSpeech: boolean;
  extra?: {
    before: string;
    after: string;
  };
}

export class Configuration {
  static getConfiguration(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration("msw");
  }
}
