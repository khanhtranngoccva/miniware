import fs from "fs";
import {load} from "pe-library/cjs";
import {getExecutableStrings} from "@/utils/executable/strings";

async function main() {
  const executablePath = "./test_coccoc.exe";
  const PE = await load();

  const buf = await fs.promises.readFile(executablePath);
  const executable = PE.NtExecutable.from(buf, {
    ignoreCert: true
  });

  const strings = await getExecutableStrings(executablePath);
  console.log(strings.filter(s => /http/.test(s)));
}

main().then();
