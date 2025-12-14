# Project Rules

## 🔄 Project Awareness & Context
- **Always read `docs/PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `docs/TASK.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `docs/PLANNING.md`.

## 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
- **Use clear, consistent imports** (prefer relative imports within packages where appropriate).

## 🧪 Testing & Reliability
- **Always create tests for new features** (functions, classes, routes, etc).
- **After updating any logic**, check whether existing tests need to be updated. If so, do it.
- **Tests should live in a `/tests` folder** mirroring the main app structure.
  - Include at least:
    - 1 test for expected use (happy path)
    - 1 edge case
    - 1 failure case

## ✅ Task Completion
- **Mark completed tasks in `docs/TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `docs/TASK.md` under a "Discovered During Work" section.

## 📎 Style & Conventions
**[CUSTOMIZE: Add your language/framework specific conventions here]**

Examples to adapt based on your stack:
- **Python**: Follow PEP8, use type hints, format with `black` or `ruff`
- **TypeScript**: Use ESLint, Prettier, strict mode enabled
- **Go**: Follow standard Go conventions, use `gofmt`
- **Rust**: Use `rustfmt`, `clippy` for linting

Write **docstrings/comments for functions** using your language's standard:
```
Python: Google-style docstrings
TypeScript: JSDoc comments
Go: Standard Go comments above declarations
```

## 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline comment** explaining the why, not just the what.

## 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `docs/TASK.md`.

## 📖 External References
When you encounter tasks related to specific areas, load the relevant documentation:
- For PRP creation: @PRPs/README.md
- For code examples: @examples/README.md
- For project architecture: @docs/PLANNING.md
- For active tasks: @docs/TASK.md
