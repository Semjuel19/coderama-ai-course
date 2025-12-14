# Quick Start Guide

## 🚀 Your Context Engineering Template is Ready!

This template helps you build better AI-assisted projects through structured context engineering.

## First Time Setup (5 minutes)

### 1. Customize for Your Project

Before generating your first PRP, update these files:

```bash
# 1. Define your project architecture
# Edit: docs/PLANNING.md
# Add: tech stack, directory structure, conventions

# 2. Set coding standards
# Edit: AGENTS.md
# Add: language-specific rules (Python/TS/Go/Rust)

# 3. Update validation commands
# Edit: PRPs/templates/prp_base.md
# Replace: placeholder commands with your linting/testing tools

# 4. Add code examples (optional but highly recommended)
# Add files to: examples/
# See: examples/README.md for guidance
```

### 2. Try the Example

Test the workflow with the included example:

```bash
# Generate a PRP from the example feature request
/generate-prp INITIAL_EXAMPLE.md

# Review the generated PRP
# Location: PRPs/rest-api-client-with-retry-logic.md

# Execute it (when ready)
/execute-prp PRPs/rest-api-client-with-retry-logic.md
```

## Daily Workflow

### Building a New Feature

```bash
# 1. Create feature request
cp INITIAL.md my-feature.md
# Edit my-feature.md with:
#   - FEATURE: What to build
#   - EXAMPLES: Code patterns to follow
#   - DOCUMENTATION: Relevant links
#   - OTHER CONSIDERATIONS: Gotchas

# 2. Generate PRP
/generate-prp my-feature.md

# 3. Review & refine PRP
# Check: PRPs/my-feature.md
# Verify: All context is included
# Confirm: Validation commands are correct

# 4. Implement
/execute-prp PRPs/my-feature.md
```

## Available Commands

| Command | Description |
|---------|-------------|
| `/generate-prp [file]` | Creates comprehensive PRP from feature request |
| `/execute-prp [file]` | Implements feature from PRP with validation loops |

## Available Agents

### Primary Agents (use Tab to switch)
- **build** - Full development with all tools
- **plan** - Analysis only, read-only mode

### Subagents (@ mention or auto-invoked)
- **@test-provider** - Creates comprehensive tests
- **@prp-generator** - Generates PRPs (used by `/generate-prp`)
- **@explore** - Fast codebase exploration (built-in)
- **@general** - General research (built-in)

## Key Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Global rules for all AI interactions |
| `docs/PLANNING.md` | Project architecture & conventions |
| `docs/TASK.md` | Active task tracker |
| `PRPs/templates/prp_base.md` | Template for all PRPs |
| `examples/` | Code patterns for AI to follow |

## Tips for Success

### 1. Be Specific in Feature Requests
❌ Bad: "Add authentication"
✅ Good: "Add JWT authentication with refresh tokens, rate limiting (max 5 attempts/minute), and secure password hashing using bcrypt"

### 2. Leverage Examples
The more example code you provide, the better AI understands your patterns.

### 3. Use Validation Loops
PRPs include validation commands that AI runs to verify its work. This catches issues early.

### 4. Keep docs/PLANNING.md Updated
AI reads this for project context. Update it when your architecture evolves.

### 5. Track Tasks
Use `docs/TASK.md` to track what's being worked on. AI will check this before starting.

## Common Patterns

### API Integration
```markdown
## FEATURE:
Integrate with [API name] to [purpose]
- Handle authentication via [method]
- Implement retry with exponential backoff
- Rate limit: [X] requests per [time]

## DOCUMENTATION:
- API docs: [URL]
- Auth guide: [URL]
```

### Database Feature
```markdown
## FEATURE:
Add [entity] with CRUD operations
- Database: [PostgreSQL/MongoDB/etc]
- ORM: [SQLAlchemy/Prisma/etc]
- Include migrations and indexes

## EXAMPLES:
- examples/models/ - Follow this pattern
- examples/repositories/ - Use this structure
```

### CLI Tool
```markdown
## FEATURE:
Create CLI command for [purpose]
- Framework: [Click/Typer/Commander/etc]
- Args: [list arguments]
- Output: [format]

## EXAMPLES:
- examples/cli.py - Follow this pattern
```

## Troubleshooting

### PRP Generation Issues
- **Missing context**: Add more details to INITIAL.md
- **Wrong validation commands**: Update PRPs/templates/prp_base.md
- **Can't find examples**: Add code to examples/ folder

### Execution Issues
- **Tests failing**: Check validation commands in PRP
- **Wrong patterns**: Add better examples to examples/
- **Missing dependencies**: Update docs/PLANNING.md

## Next Steps

1. ✅ Complete first-time setup (above)
2. ✅ Try the example workflow
3. ✅ Build your first real feature
4. 📖 Read the full [README.md](README.md) for details

## Need Help?

- 📖 **Full guide**: [README.md](README.md)
- 📋 **PRP documentation**: [PRPs/README.md](PRPs/README.md)
- 🎯 **Example feature**: [INITIAL_EXAMPLE.md](INITIAL_EXAMPLE.md)
- 🔗 **OpenCode docs**: https://opencode.ai/docs

---

**Happy coding with context engineering! 🚀**
