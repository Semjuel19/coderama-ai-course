# Context Engineering Template for OpenCode

A comprehensive template for context engineering with AI coding assistants, specifically adapted for [OpenCode](https://opencode.ai).

## What is Context Engineering?

Context engineering is a systematic approach to providing AI coding assistants with all the information they need to implement features correctly on the first try.

> **Context Engineering is 10x better than prompt engineering and 100x better than vibe coding.**

## Quick Start

```bash
# 1. Start with a feature request
# Edit INITIAL.md with your feature description

# 2. Generate a comprehensive PRP
/generate-prp INITIAL.md

# 3. Review the generated PRP in PRPs/

# 4. Execute the PRP to implement your feature
/execute-prp PRPs/your-feature-name.md
```

## Template Structure

```
.
├── .opencode/
│   ├── agent/           # Agent definitions (plan, build, test-provider, prp-generator)
│   └── command/         # Custom commands (/generate-prp, /execute-prp)
├── PRPs/                # Product Requirements Prompts
├── examples/            # Code patterns for AI reference
├── docs/
│   ├── PLANNING.md      # Project architecture
│   └── TASK.md          # Task tracker
├── AGENTS.md            # Global AI rules
├── INITIAL.md           # Feature request template
└── INITIAL_EXAMPLE.md   # Example feature request
```

## Customization Checklist

When using this template for a new project, customize:

### Must Update
- [ ] `AGENTS.md` - Add language/framework specific conventions
- [ ] `docs/PLANNING.md` - Fill in your project's architecture
- [ ] `PRPs/templates/prp_base.md` - Update validation commands for your stack
- [ ] `examples/` - Add real code patterns from your project

### Recommended
- [ ] `opencode.json` - Configure models, MCP servers, permissions
- [ ] `.gitignore` - Add language-specific ignores
- [ ] `.env` - Add your API keys

### MCP Integrations
This template includes pre-configured MCP servers:
- **Context7** - Search documentation for libraries and frameworks
- **Figma** - Convert Figma designs directly into code

### Language-Specific Updates

| Language | Validation Commands | Testing |
|----------|---------------------|---------|
| Python | `ruff check .`, `mypy .` | `pytest` |
| TypeScript | `npx eslint .`, `npx tsc` | `npm test` |
| Go | `go fmt`, `go vet` | `go test` |
| Rust | `cargo fmt`, `cargo clippy` | `cargo test` |

## Workflow

1. **INITIAL.md** → Describe your feature
2. **`/generate-prp`** → Creates comprehensive PRP with research
3. **Review PRP** → Ensure all context is included
4. **`/execute-prp`** → AI implements with validation loops
5. **Iterate** → Fix any issues, re-run validation

## Agents

This template includes specialized agents for different tasks:

### Primary Agents
- **Build** - Full development work with all tools enabled
- **Plan** - Analysis and planning without making changes

### Subagents
- **test-provider** - Creates comprehensive tests for implemented code
- **prp-generator** - Generates Product Requirements Prompts (invoked by `/generate-prp`)
- **explore** - Fast codebase exploration (built-in OpenCode agent)
- **general** - General-purpose research (built-in OpenCode agent)

## Custom Commands

### `/generate-prp [file]`
Generates a comprehensive PRP from a feature request file.
- Uses the **prp-generator** subagent (Opus model)
- Researches codebase and documentation
- Creates structured implementation blueprint

### `/execute-prp [file]`
Executes a PRP to implement the feature.
- Uses the **build** agent
- Follows validation loops
- Ensures all success criteria are met

## Best Practices

### 1. Be Explicit in INITIAL.md
- Don't assume the AI knows your preferences
- Include specific requirements and constraints
- Reference examples liberally

### 2. Provide Comprehensive Examples
- More examples = better implementations
- Show both what to do AND what not to do
- Include error handling patterns

### 3. Use Validation Gates
- PRPs include test commands that must pass
- AI will iterate until all validations succeed
- This ensures working code

### 4. Keep docs/PLANNING.md Updated
- AI reads this for project context
- Update when architecture changes
- Include conventions and patterns

## Resources

- [OpenCode Documentation](https://opencode.ai/docs)
- [Context Engineering Best Practices](https://www.philschmid.de/context-engineering)
- [Original Template](https://github.com/coleam00/context-engineering-intro)

## License

MIT
