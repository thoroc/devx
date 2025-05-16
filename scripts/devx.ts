import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { commandMap } from "./cli/mod.ts";
import denoConfig from "./deno.json" with { type: "json" };

interface Config {
  version?: string;
  tasks: Record<string, string>;
  imports: Record<string, string>;
  workspace: string[];
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const version = (denoConfig as Config).version;

  const cmd = new Command()
    .name("devx")
    .description("Set of commands to help with Dev tasks")
    .version(version)
    .globalOption("-v, --verbose", "Enable verbosity", { default: false })
    .action(function (this: Command) {
      this.showHelp();
    });

  for (const [name, command] of Object.entries(commandMap)) {
    cmd.command(name, command)
      .action(function (this: Command) {
        this.showHelp();
      });
  }

  cmd.parse(Deno.args);
}
