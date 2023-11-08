import * as path from "path";
import {ROOT_APP_DIRECTORY} from "@/constants";
import * as process from "process";
import {UtilityFilePaths} from "@/types";

export function getApplicationPath(appPath: string) {
  return path.join(ROOT_APP_DIRECTORY, appPath);
}

export function getUtilityFilePath(record: UtilityFilePaths): string {
  const path = record[process.platform];
  if (!path) {
    throw new Error("No utility available for this platform.")
  }
  return getApplicationPath(path);
}
