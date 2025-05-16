import { runExecutable } from "../exec/mod.ts";
import type { EnvVar } from "./types.ts";

/**
 * Transform a multiline string of name=value to an object
 *
 * @param {string} envfileAsString - the data to transform
 *
 * @returns {Promise<Array<EnvVar>>} an array of EnvVar object
 */
export const getDynamicEnvVar = async (
  envfileAsString: string,
): Promise<EnvVar[]> => {
  const lines = envfileAsString.split("\n");
  const filteredComments = lines.filter((line) =>
    line.trim() !== "" && !line.startsWith("#")
  );
  const envVars = filteredComments.map(async (line) => {
    const [name, value] = line.split("=", 2);

    // Check if we are calling a util to get a value
    if (value.startsWith("$(") && value.endsWith(")")) {
      // remove the start and end
      const nakedCmd = value.replace(/^\$\(/, "").replace(/\)$/, "");
      const nakedCmdParts = nakedCmd.split(" ");
      const [cmd, ...args] = nakedCmdParts;

      const actualValue = await runExecutable(cmd, args);

      return { name, value: actualValue };
    }

    return { name, value };
  });

  return Promise.all(envVars);
};
