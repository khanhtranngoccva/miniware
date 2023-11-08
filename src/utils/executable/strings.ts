import * as process from "process";
import {getUtilityFilePath} from "@/utils/server/directories";
import {executeCLI} from "@/utils/server/cli";

const STRINGS_PATH: Partial<Record<typeof process.platform, string>> = {
  win32: "/lib/windows/strings64.exe",
}

export async function getExecutableStrings(executablePath: string) {
  const stringsUtil = getUtilityFilePath(STRINGS_PATH);

  const strings = await executeCLI(stringsUtil, [
    executablePath, "-nobanner"
  ], {
    warnOnly: true
  });

  return strings.split(/\r?\n/);
}
