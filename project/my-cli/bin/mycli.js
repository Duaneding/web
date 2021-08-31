#!\usr\bin\env node
const program = require("commander")
program.version(require("../package.json").version)

program
    .command("init <name>")
    .description("init Project")
    .action(require("../lib/init"))

program
    .command("refresh")
    .description("refresh Project")
    .action(require("../lib/refresh"))
program.parse(process.argv)