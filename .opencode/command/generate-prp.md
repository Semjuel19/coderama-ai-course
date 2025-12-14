---
description: Generate a comprehensive PRP from a feature request
agent: prp-generator
---

# Generate PRP

## Feature File: $ARGUMENTS

Generate a complete PRP (Product Requirements Prompt) for feature implementation with thorough research.

**Important**: The AI agent executing this PRP will only have the context you include. Assume the agent has access to the codebase and web search capabilities. Include URLs to documentation.

## Step 1: Load Feature Request

Read the feature file to understand:
- What needs to be built
- What examples are provided
- What documentation should be referenced
- Any gotchas or special considerations

@$ARGUMENTS

## Step 2: Research Process

### Codebase Analysis
1. Search for similar features/patterns in the codebase
2. Identify files to reference in PRP
3. Note existing conventions to follow
4. Check test patterns for validation approach

Current project structure:
!`tree -L 3 -I 'node_modules|.git|__pycache__|.venv|dist|build' 2>/dev/null || find . -type f -name "*.md" | head -20`

### External Research
1. Search for similar features/patterns online using web search
2. Find library documentation (include specific URLs)
3. Look for implementation examples
4. Identify best practices and common pitfalls

### User Clarification (if needed)
Ask about:
- Specific patterns to mirror and where to find them
- Integration requirements
- Technology preferences

## Step 3: PRP Generation

### Critical Context to Include
- **Documentation**: URLs with specific sections
- **Code Examples**: Real snippets from codebase
- **Gotchas**: Library quirks, version issues
- **Patterns**: Existing approaches to follow

### Implementation Blueprint
- Start with pseudocode showing approach
- Reference real files for patterns
- Include error handling strategy
- List tasks in execution order

### Validation Gates
Define executable validation commands appropriate for the project's language:
- Linting/formatting checks
- Type checking (if applicable)
- Unit tests
- Integration tests

## Step 4: Quality Review

**CRITICAL**: Before writing the PRP, ULTRATHINK about:
- Is all necessary context included?
- Are validation gates executable?
- Does it reference existing patterns?
- Is the implementation path clear?
- Is error handling documented?

## Output

Save the PRP as: `PRPs/{feature-name}.md`

Score the PRP on a scale of 1-10 (confidence level for one-pass implementation success).

**Goal**: One-pass implementation success through comprehensive context.
