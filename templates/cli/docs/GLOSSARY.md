# Glossary

CLI-specific terms used throughout this codebase.

<!-- Add terms in alphabetical order. -->

| Term       | Definition                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| argument   | A positional value passed to a command (e.g. `{{projectName}} build ./src`)                                |
| command    | A top-level verb that describes an action (e.g. `init`, `build`, `deploy`)                                 |
| exit code  | A number returned to the shell after a process exits; `0` means success, non-zero means failure            |
| flag       | A named option that modifies command behavior (e.g. `--verbose`, `--output dist/`)                         |
| stderr     | Standard error stream — used for diagnostic output (errors, warnings, progress) that should not be piped   |
| stdout     | Standard output stream — used for intended output that callers may pipe or redirect                        |
| subcommand | A secondary verb that extends a command (e.g. `config get`, `config set`)                                  |
