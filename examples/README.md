# Code Examples

This folder should contain code patterns for AI assistants to reference when implementing features.

## ⚠️ Action Required

**This folder is intentionally empty.** When initializing a new project from this template, populate this folder with:

1. **Code patterns** from your project's codebase
2. **Architecture examples** showing how components should be structured
3. **Test patterns** demonstrating your testing approach
4. **Integration examples** for APIs, databases, etc.

## Why Examples Matter

AI coding assistants perform significantly better when they can see patterns to follow. Providing examples helps ensure:
- Consistent coding style
- Proper error handling
- Correct architectural patterns
- Appropriate test coverage

## Recommended Structure

```
examples/
├── README.md              # This file
├── [module_name]/         # Feature-specific patterns
│   ├── implementation.py  # Core implementation pattern
│   ├── models.py          # Data model patterns
│   └── tests/             # Test patterns
├── cli.py                 # CLI pattern (if applicable)
├── api_client.py          # HTTP client pattern
└── config.py              # Configuration pattern
```

## How to Reference Examples

In your `INITIAL.md` feature requests, reference examples like this:

```markdown
## EXAMPLES:

- `examples/api_client.py` - Use this HTTP client pattern
- `examples/tests/` - Follow this test structure
```

## Tips for Good Examples

1. **Keep examples focused** - Each file should demonstrate one pattern
2. **Add comments** - Explain the "why" not just the "what"
3. **Show edge cases** - Include error handling
4. **Stay current** - Update when patterns change
