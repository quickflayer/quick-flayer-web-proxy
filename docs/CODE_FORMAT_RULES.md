# Code Format Rules - ARCA EMR

This document outlines the coding standards and formatting rules for the ARCA EMR project.

## Table of Contents

- [General Principles](#general-principles)
- [Naming Conventions](#naming-conventions)
- [Import Order](#import-order)
- [React Components](#react-components)
- [TypeScript Guidelines](#typescript-guidelines)
- [File Organization](#file-organization)
- [ESLint Rules](#eslint-rules)
- [Prettier Configuration](#prettier-configuration)

## General Principles

- **Consistency** - Follow established patterns throughout the codebase
- **Readability** - Code should be self-documenting and easy to understand
- **Maintainability** - Write code that is easy to modify and extend
- **Performance** - Consider performance implications of coding choices

## Naming Conventions

### Files and Directories

- **Folders**: Use `kebab-case`

  ```
  ✅ user-profile/
  ✅ date-range-picker/
  ❌ UserProfile/
  ❌ dateRangePicker/
  ```

- **TypeScript files**: Use `kebab-case`

  ```
  ✅ user-profile.ts
  ✅ date-utils.ts
  ❌ UserProfile.ts
  ❌ dateUtils.ts
  ```

- **Component files**: Use `PascalCase` (except index.tsx/page.tsx)
  ```
  ✅ UserProfile.tsx
  ✅ DateRangePicker.tsx
  ✅ index.tsx
  ✅ page.tsx
  ❌ userProfile.tsx
  ```

### Variables and Functions

- **Variables**: Use `camelCase`

  ```typescript
  ✅ const userName = 'john';
  ✅ const isLoggedIn = true;
  ❌ const user_name = 'john';
  ❌ const IsLoggedIn = true;
  ```

- **Functions**: Use `camelCase`
  ```typescript
  ✅ const getUserData = () => {};
  ✅ const handleSubmit = () => {};
  ❌ const GetUserData = () => {};
  ❌ const handle_submit = () => {};
  ```

### Classes, Types, and Interfaces

- **Classes**: Use `PascalCase`

  ```typescript
  ✅ class UserService {}
  ✅ class DateRangePicker {}
  ❌ class userService {}
  ```

- **Types/Interfaces**: Use `PascalCase`
  ```typescript
  ✅ interface UserData {}
  ✅ type DateRange = {};
  ❌ interface userData {}
  ```

### Constants

- **Constants**: Use `UPPER_CASE_WITH_UNDERSCORES`
  ```typescript
  ✅ const MAX_FILE_SIZE = 5 * 1024 * 1024;
  ✅ const API_ENDPOINTS = {};
  ❌ const maxFileSize = 5 * 1024 * 1024;
  ```

## Import Order

Imports must follow this exact order with blank lines between groups:

```typescript
// 1. React imports (first)
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// 2. Next.js imports
import { usePathname } from 'next/navigation';

// 3. External dependencies (alphabetical)
import { Box, IconButton } from '@mui/material';
import { maxBy } from 'lodash';
import { IoIosAdd } from 'react-icons/io';
import { toast } from 'sonner';

// 4. @core/** imports
import { DateRange } from '@core/components/date-range-picker/types';

// 5. @/** imports (grouped by type)
import AddRecord from '@/lib/add_record';
import EditableText from '@/lib/common/editable_text';

import { useCurrentPatientStore } from '@/store/currentPatientStore';
import { useDoctorStore } from '@/store/emr/doctor-profile/personal-info';

import { SummarizeConversationRes } from '@/query/speech';
import { getPatientHistory } from '@/query/patient';

import { noteModes } from '@/utils/constants/consultation';
import { formatDate } from '@/utils/dateUtils/dayUtils';

import ExpandNoteIcon from '@/assets/svg/ExpandNoteIcon';

import { calculateAge } from '@/helpers/dates';

import Chat from '@/emr/components/chat';
import PatientCard from '@/emr/components/patient-card';

// 6. Relative imports
import TextInput from '../text-input';
import Tooltip from '../tooltip';

import { DateRangePickerProps } from './types';

// 7. CSS/SCSS imports (last)
import './styles.scss';
```

## React Components

### Component Definition

- Use **arrow function syntax** for components
- Use **memo** at export level

```typescript
// ✅ Correct
const UserProfile = ({ name, email }: UserProfileProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
};

export default memo(UserProfile);

// ❌ Incorrect
function UserProfile({ name, email }: UserProfileProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}

export default UserProfile;
```

### Props Interface

- Define props interface above the component
- Use descriptive names

```typescript
interface UserProfileProps {
  name: string;
  email: string;
  isActive?: boolean;
  onUpdate?: (data: UserData) => void;
}

const UserProfile = ({ name, email, isActive = false }: UserProfileProps) => {
  // Component implementation
};
```

### Hooks Usage

- Group hooks at the top of the component
- Use descriptive names for custom hooks

```typescript
const UserProfile = ({ userId }: UserProfileProps) => {
  // State hooks
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Custom hooks
  const { currentUser } = useUserStore();
  const { data: userProfile } = useUserProfile(userId);

  // Effect hooks
  useEffect(() => {
    // Effect logic
  }, [userId]);

  // Component logic and JSX
};
```

## TypeScript Guidelines

### Type Definitions

- Use `type` for unions, primitives, object shapes, and computed types

```typescript
// ✅ Interface for object shapes
type UserData = {
  id: string;
  name: string;
  email: string;
};

// ✅ Type for unions
type Status = 'loading' | 'success' | 'error';

// ✅ Type for computed types
type UserKeys = keyof UserData;
```

### Unused Parameters

- Prefix unused parameters with underscore

```typescript
// ✅ Correct
const handleSubmit = (_event: FormEvent, data: FormData) => {
  // Only using data, not event
  processData(data);
};

// ❌ Incorrect
const handleSubmit = (event: FormEvent, data: FormData) => {
  // ESLint will warn about unused 'event'
  processData(data);
};
```

## File Organization

### Root Directory Structure

```
src/
├── app/                    # Next.js app directory (routes)
│   ├── (auth)/            # Authentication routes
│   ├── (private)/         # Protected routes
│   │   ├── emr/          # EMR module routes
│   │   └── mrd/          # MRD module routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── core/                  # Core components and utilities
│   ├── components/       # Reusable UI components
│   ├── configs/          # Configuration files
│   ├── guard/            # Route guards
│   ├── layout/           # Layout components
│   ├── lib/              # Core utilities
│   └── providers/        # Context providers
├── emr/                   # EMR module (components, hooks, types) - Don't add anything new here
├── mrd/                   # MRD module (components, hooks, types) - Don't add anything new here
├── store/                 # State management (Zustand)
    ├── emr/
        └── [feature-name]/
    └── mrd/
├── query/                 # API queries and mutations
    ├── emr/
        └── [feature-name]/
    └── mrd/
├── utils/                 # Utility functions
    ├── emr/
        └── [feature-name]/
    └── mrd/
├── helpers/               # Helper functions
├── hooks/                 # Global custom hooks
├── lib/                   # Shared components/utilities
├── assets/                # Static assets (images, icons)
├── components/            # Shared components
    ├── emr/
        └── [feature-name]/
    └── mrd/
├── constants/             # Application constants
    ├── emr/
        └── [feature-name]/
    └── mrd/
├── types/                 # Global type definitions
      ├── emr/
          └── [feature-name]/
      └── mrd/
└── views/                 # View components
    ├── emr/
        └── [feature-name]/
    └── mrd/
        └── [feature-name]/
```

### Feature-Based Organization (Preferred Pattern)

Based on the **lifestyle** and **doctor-profile** implementations, follow this structure for new features:

#### 1. Route Structure (app directory)

```
src/app/(private)/emr/[feature-name]/
├── layout.tsx                    # Feature layout
├── page.tsx                     # Feature main page
├── [sub-feature]/               # Sub-features
│   ├── layout.tsx              # Sub-feature layout
│   ├── page.tsx                # Sub-feature page
│   └── [sub-page]/             # Nested pages
│       └── page.tsx
└── [another-sub-feature]/
    ├── layout.tsx
    ├── page.tsx
    ├── [tab-1]/
    │   └── page.tsx
    ├── [tab-2]/
    │   └── page.tsx
    └── [tab-3]/
        └── page.tsx
```

#### 2. Components Structure

```
src/emr/components/[feature-name]/
├── index.tsx                    # Main feature component
├── [FeatureComponent].tsx       # Feature-specific components
├── [feature-name]-forms/        # Form components
│   ├── [FormName].tsx
│   └── index.ts
├── mobile/                      # Mobile-specific components
│   └── [MobileComponent].tsx
└── shared/                      # Shared components within feature
    └── [SharedComponent].tsx
```

#### 3. State Management Structure

```
src/store/emr/[feature-name]/
├── [feature-data-store].ts     # Main data store
├── [navigation-store].ts       # Navigation/UI state
└── [sub-feature]/              # Sub-feature stores
    └── index.ts
```

#### 4. API Queries Structure

```
src/query/emr/[feature-name]/
├── index.ts                     # Main API functions
└── [sub-feature]/              # Sub-feature APIs
    └── index.ts
```

### Real Examples from Codebase

#### Lifestyle Feature Structure (✅ Follow this pattern)

```
# Routes
app/(private)/emr/lifestyle/
├── layout.tsx
├── page.tsx
├── general/
│   ├── layout.tsx
│   ├── page.tsx
│   └── medical-history-addiction/
│       └── page.tsx
├── nutrition/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── attitude/page.tsx
│   ├── practice/page.tsx
│   └── knowledge/page.tsx
├── physical-activity/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── attitude/page.tsx
│   ├── practice/page.tsx
│   └── knowledge/page.tsx
├── mental-health/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── attitude/page.tsx
│   ├── practice/page.tsx
│   └── knowledge/page.tsx
├── sleep-activity/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── attitude/page.tsx
│   ├── practice/page.tsx
│   └── knowledge/page.tsx
└── spiritual-activity/
    ├── layout.tsx
    ├── page.tsx
    ├── attitude/page.tsx
    ├── practice/page.tsx
    └── knowledge/page.tsx

# Components
emr/components/lifestyle/
├── LifestyleNote.tsx
├── LifestyleNoteModal.tsx
├── LifestyleTabs.tsx
├── NowConsulting.tsx
├── TabPanels.tsx
├── lifestyle-forms/
│   └── [various form components]
└── mobile/
    └── [mobile-specific components]

# Store
store/emr/lifestyle/
├── lifestyle-data-store.ts
└── navigation-store.ts

# Queries
query/emr/lifestyle/
└── index.ts
```

#### Doctor Profile Feature Structure (✅ Follow this pattern)

```
# Routes
app/(private)/emr/profile/
├── layout.tsx
├── personal-info/
│   └── page.tsx
└── customise/
    └── page.tsx

# Store
store/emr/doctor-profile/
├── personal-info/
│   ├── index.ts
│   └── pincode.ts
└── customise-emr/
    └── index.ts

# Queries
query/emr/doctor-profile/
├── personal-info/
└── customise-emr/
```

### Component File Structure

```
component-name/
├── index.tsx              # Main component
├── types.ts              # Type definitions
├── styles.scss           # Component styles
├── hooks/                # Component-specific hooks
├── components/           # Sub-components
└── utils/                # Component utilities
```

### Key Principles for New Features

1. **Feature-based organization** - Group related functionality together
2. **Consistent naming** - Use kebab-case for folders, follow established patterns
3. **Separation of concerns** - Routes, components, state, and queries in separate directories
4. **Scalable structure** - Support for sub-features and nested functionality
5. **Module isolation** - EMR and MRD features are separate but follow same patterns

## ESLint Rules

### Import Order

- Enforced automatically via `eslint-plugin-import`
- Groups imports by type and origin
- Requires blank lines between groups

### Unused Imports

- Automatically detected and removed via `eslint-plugin-unused-imports`
- Removes unused imports completely
- Removes unused named imports from used modules
- Works with pre-commit hooks for automatic cleanup

### Unused Variables

- Variables starting with `_` are ignored
- Helps identify dead code
- Set to warning level

### React Hooks

- Enforces exhaustive dependencies
- Warns about missing dependencies in useEffect

## Prettier Configuration

```javascript
// .prettierrc.js
module.exports = {
  semi: true, // Always use semicolons
  tabWidth: 2, // 2 spaces for indentation
  singleQuote: true, // Use single quotes
  trailingComma: 'es5', // Trailing commas where valid
  printWidth: 80, // Line length limit
};
```

## Enforcement

These rules are enforced through:

1. **ESLint** - Code quality and import order
2. **Prettier** - Code formatting
3. **Pre-commit hooks** - Automatic checking before commits
4. **TypeScript** - Type safety and unused variable detection

## Examples

### ✅ Good Example

```typescript
import React, { useState, useCallback } from 'react';

import { Button } from '@mui/material';

import { useUserStore } from '@/store/userStore';

import './UserProfile.scss';

interface UserProfileProps {
  userId: string;
  onUpdate?: (data: UserData) => void;
}

const UserProfile = ({ userId, onUpdate }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useUserStore();

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="user-profile">
      <h1>{currentUser?.name}</h1>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
};

export default memo(UserProfile);
```

### ❌ Bad Example

```typescript
import './UserProfile.scss';
import { Button } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { useUserStore } from '@/store/userStore';

function UserProfile({ userId, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useUserStore();
  const unusedVariable = 'test';

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div className="user-profile">
      <h1>{currentUser?.name}</h1>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
}

export default UserProfile;
```

## Quick Reference

### Naming Cheat Sheet

| Type             | Convention | Example           |
| ---------------- | ---------- | ----------------- |
| Folders          | kebab-case | `user-profile/`   |
| TS Files         | kebab-case | `date-utils.ts`   |
| Components       | PascalCase | `UserProfile.tsx` |
| Variables        | camelCase  | `userName`        |
| Functions        | camelCase  | `getUserData`     |
| Classes          | PascalCase | `UserService`     |
| Types/Interfaces | PascalCase | `UserData`        |
| Constants        | UPPER_CASE | `MAX_FILE_SIZE`   |

### Import Order Checklist

1. ✅ React imports first
2. ✅ Next.js imports
3. ✅ External dependencies (alphabetical)
4. ✅ @core/\*\* imports
5. ✅ @/\*\* imports (grouped by type)
6. ✅ Relative imports
7. ✅ CSS/SCSS imports last
8. ✅ Blank lines between groups

### Component Checklist

- ✅ Use arrow function syntax
- ✅ Export with memo
- ✅ Define props interface
- ✅ Group hooks at top
- ✅ Prefix unused params with `_`

### Feature Structure Checklist

For new features, create these directories:

1. ✅ **Routes**: `app/(private)/emr/[feature-name]/`

   - Main layout.tsx and page.tsx
   - Sub-features with their own layouts
   - Tab pages for complex features

2. ✅ **Components**: `emr/components/[feature-name]/`

   - Main component files
   - Forms subdirectory
   - Mobile subdirectory if needed

3. ✅ **State**: `store/emr/[feature-name]/`

   - Data store files
   - Navigation/UI state
   - Sub-feature stores

4. ✅ **Queries**: `query/emr/[feature-name]/`

   - API functions
   - Sub-feature APIs

5. ✅ **Follow existing patterns** from lifestyle/doctor-profile

## Tools and Commands

```bash
# Check code formatting
npm run lint

# Auto-fix formatting issues
npm run lint:fix

# Format all files with Prettier
npm run format:all

# Run pre-commit checks manually
npx lint-staged
```

## Related Documentation

- [Pre-commit Hooks](./PRE_COMMIT_HOOKS.md) - Setup and usage of pre-commit hooks
- [Lifestyle Module Guidelines](../lifestyle/LIFESTYLE_BASE.md) - Module-specific guidelines
- [ESLint Configuration](../.eslintrc.json) - ESLint rules configuration
- [Prettier Configuration](../.prettierrc.js) - Prettier formatting rules
