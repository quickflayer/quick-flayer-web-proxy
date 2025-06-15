# Pre-commit Hooks

This project uses pre-commit hooks to ensure code quality and consistency before commits are made to the repository.

## What happens on commit

When you run `git commit`, the following checks are automatically performed on staged files:

### For JavaScript/TypeScript files (_.js, _.jsx, _.ts, _.tsx):

1. **ESLint** - Checks and fixes code quality issues

   - **Unused imports removal** - Automatically removes unused imports
   - **Import order enforcement** - Organizes imports in specific order
   - **Unused variables detection** - Warns about unused variables
   - **React hooks rules** - Ensures proper hook usage
   - **Custom project rules** - Project-specific linting rules

2. **Prettier** - Formats code consistently
   - Indentation
   - Semicolons
   - Quotes
   - Line breaks

### For other files (_.json, _.css, _.scss, _.md):

1. **Prettier** - Formats files consistently

## Setup

The pre-commit hooks are automatically set up when you run:

```bash
npm install
```

This runs the `prepare` script which initializes Husky.

## Manual execution

You can manually run the pre-commit checks on staged files:

```bash
npx lint-staged
```

Or run linting/formatting on all files:

```bash
# Lint and fix all files
npm run lint:fix

# Format all files
npm run format:all
```

## Configuration

### Husky

- Configuration: `.husky/pre-commit`
- Runs: `npx lint-staged`

### Lint-staged

- Configuration: `package.json` → `lint-staged` section
- Runs different commands based on file types

### ESLint

- Configuration: `.eslintrc.json`
- Extended configurations in `eslint-rules/` directory

### Prettier

- Configuration: `.prettierrc.js`

## Bypassing hooks (not recommended)

In rare cases, you can bypass the pre-commit hook:

```bash
git commit --no-verify -m "commit message"
```

**Note:** This is not recommended as it skips code quality checks.

## Troubleshooting

### Hook not running

1. Ensure Husky is installed: `npm run prepare`
2. Check if `.husky/pre-commit` exists and is executable

### Linting errors

1. Run `npm run lint` to see all issues
2. Run `npm run lint:fix` to auto-fix issues
3. Manually fix remaining issues

### Formatting issues

1. Run `npm run format:all` to format all files
2. Check `.prettierrc.js` configuration if needed
