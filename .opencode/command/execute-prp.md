---
description: Execute a PRP to implement a feature
agent: build
---

# Execute PRP

## PRP File: $ARGUMENTS

Implement a feature using the specified PRP file.

## Step 1: Load PRP

Read the PRP file completely:

@$ARGUMENTS

Understand all context and requirements before proceeding.

## Step 2: ULTRATHINK & Plan

Think deeply before executing:

1. **Understand Requirements**: Review all sections of the PRP
2. **Identify Dependencies**: What needs to exist before implementation?
3. **Create Task List**: Break down into manageable steps using TodoWrite
4. **Identify Patterns**: Find existing code patterns to follow
5. **Extend Research**: Do additional web searches if context is insufficient

## Step 3: Execute Implementation

For each task in your plan:
1. Implement the code
2. Follow patterns identified in the PRP
3. Handle errors as documented
4. Add appropriate comments

## Step 4: Validate

Run each validation command from the PRP:
1. Execute linting/formatting
2. Run type checks
3. Execute unit tests
4. Run integration tests (if applicable)

**If validation fails**:
- Read the error carefully
- Use error patterns in PRP to diagnose
- Fix the issue
- Re-run validation
- Repeat until all pass

## Step 5: Complete

Final checklist:
- [ ] All validation gates pass
- [ ] All success criteria from PRP met
- [ ] Documentation updated if needed
- [ ] Tests are comprehensive

Re-read the PRP one more time to ensure nothing was missed.

## Reference

You can always reference the PRP again during implementation:

@$ARGUMENTS

**Note**: If you encounter issues not covered in the PRP, document them for future improvement.
