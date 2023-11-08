import childProcess from "child_process";
import process from "process";

export class ProcessError extends Error {}

export interface ExecutionOptions {
  warnOnly?: boolean
}

export async function executeCLI(command: string, args?: string[], options?: ExecutionOptions) {
  const warnOnly = options?.warnOnly ?? false;
  const childProc = childProcess.spawn(command, args);
  let out = "";

  childProc.stdout.on("data", (data) => {
    out += data.toString();
  })

  return await new Promise<string>((resolve, reject) => {
    childProc.on("exit", (code, signal) => {
      if (!code) {
        resolve(out);
      } else {
        const msg = `Process exited with code ${code}`;
        if (warnOnly) {
          console.warn(msg);
          resolve(out);
        } else {
          reject(new ProcessError(msg));
        }
      }
    });
  });
}
