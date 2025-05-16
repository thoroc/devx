import { Input } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import { parse, stringify } from "jsr:@std/dotenv";
import "jsr:@std/dotenv/load";
import { exists } from "jsr:@std/fs";
import { getDefaultEnvVars } from "@dev/std";
import type { GlobalOptions } from "@dev/command";

const promptForEnvVar = async (
  name: string,
  defaultValue: string,
  yes?: boolean,
) => {
  let response: string = "n";

  if (!yes) {
    response = await Input.prompt({
      message: "Do you want to set it? (Y/n)",
      default: "y",
      validate: (value) => {
        if (!["y", "Y", "n", "N"].includes(value)) {
          return "Please enter either y or n";
        }
        return true;
      },
    });
  }

  if (response.toLowerCase() === "y" || yes) {
    const value = await Input.prompt({
      message: `Enter the value for ${name}`,
      default: defaultValue,
    });

    Deno.env.set(name, value);
  }
};

interface EnvOptions extends GlobalOptions {
  yes?: boolean;
  overwrite?: boolean;
  outputFile?: string;
}

export const envAction = async (options: EnvOptions) => {
  const { outputFile = ".env", overwrite = false, verbose } = options;

  verbose && console.log("Setting up the environment variables");

  // find the .env.dist file and load all variables
  const defaultEnvVars = await getDefaultEnvVars();

  const existingEnvVars = (await exists(outputFile))
    ? parse(Deno.readTextFileSync(outputFile))
    : {};

  // check if the environment variables are set
  const envVars: Record<string, string> = {};

  for (const [name, defaultValue] of Object.entries(defaultEnvVars)) {
    if (
      (existingEnvVars[name] && existingEnvVars[name] !== defaultValue) ||
      overwrite
    ) {
      console.error(`Environment variable ${name} is not set`);

      await promptForEnvVar(name, defaultValue, options?.yes);
    }

    envVars[name] = Deno.env.get(name) || defaultValue;
    verbose && console.log(`${name}=${envVars[name]}`);
  }

  verbose && console.table(envVars);

  Deno.writeTextFile(outputFile, stringify(envVars), {
    append: false,
    create: true,
  });
};
