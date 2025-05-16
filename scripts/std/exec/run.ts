import { colors } from "jsr:@cliffy/ansi@^1.0.0-rc.7/colors";

export const runExecutable = async (
  executable: string,
  args: string[],
): Promise<string> => {
  try {
    const command = new Deno.Command(executable, {
      args,
    });

    const { code, stdout, stderr } = await command.output();

    if (code !== 0) {
      throw new Error(new TextDecoder().decode(stderr));
    }

    return new TextDecoder().decode(stdout).trim();
  } catch (error) {
    console.error(
      colors.bgBrightRed(`Error running ${executable}: ${error}`),
    );
    Deno.exit(1);
  }
};
