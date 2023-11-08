import process from "process";

export type UtilityFilePaths = Partial<Record<typeof process.platform, string>>;
