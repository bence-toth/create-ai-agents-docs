# Glossary

Design system terms used throughout this codebase.

<!-- Add terms in alphabetical order. -->

| Term              | Definition                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| component token   | A token scoped to a specific component (e.g. `button-background`) that references a semantic token                               |
| design token      | A named value representing a design decision (color, spacing, typography) that can be referenced in code and design tools        |
| primitive token   | A raw, scale-based token (e.g. `blue-500`) that holds a concrete value — not used directly in components                        |
| semantic token    | A purpose-based token (e.g. `color-primary`) that references a primitive token and carries meaning independent of the raw value  |
| slot              | A composition mechanism that lets consumers inject content into a specific region of a component                                 |
| variant           | A visual or behavioral configuration of a component (e.g. `size="sm"`, `variant="destructive"`)                                 |
| visual regression | An automated test that compares component screenshots to a stored baseline to detect unintended visual changes                   |
