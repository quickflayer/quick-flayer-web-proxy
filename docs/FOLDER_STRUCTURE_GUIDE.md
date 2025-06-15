# Folder Structure Guide - ARCA EMR

This guide outlines the preferred folder structure for the ARCA EMR project, based on the established patterns from the **lifestyle** and **doctor-profile** features.

## Overview

ARCA EMR follows a **feature-based organization** pattern that promotes:

- ✅ **Separation of concerns** - Routes, components, state, and queries are organized separately
- ✅ **Scalability** - Easy to add new features and sub-features
- ✅ **Maintainability** - Related code is grouped together
- ✅ **Consistency** - All features follow the same organizational pattern

## Root Directory Structure

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
├── query/                 # API queries and mutations
├── utils/                 # Utility functions
├── helpers/               # Helper functions
├── hooks/                 # Global custom hooks
├── lib/                   # Shared components/utilities
├── assets/                # Static assets (images, icons)
├── components/            # Shared components
    ├── emr/
    └── mrd/
        └── [feature-name]/
├── constants/             # Application constants
    ├── emr/
    └── mrd/
        └── [feature-name]/
├── types/                 # Global type definitions
    ├── emr/
    └── mrd/
        └── [feature-name]/
└── views/                 # View components
    ├── emr/
    └── mrd/
        └── [feature-name]/
```

## Feature Organization Pattern

### For New Features: Follow This 4-Layer Structure

#### 1. Routes Layer

**Location**: `src/app/(private)/emr/[feature-name]/`

```
[feature-name]/
├── layout.tsx                    # Feature layout
├── page.tsx                     # Feature main page
├── [sub-feature-1]/             # Sub-features
│   ├── layout.tsx              # Sub-feature layout
│   ├── page.tsx                # Sub-feature page
│   └── [nested-page]/          # Nested pages
│       └── page.tsx
└── [sub-feature-2]/
    ├── layout.tsx
    ├── page.tsx
    ├── [tab-1]/                # Tab pages for complex features
    │   └── page.tsx
    ├── [tab-2]/
    │   └── page.tsx
    └── [tab-3]/
        └── page.tsx
```

#### 2. Components Layer

**Location**: `src/emr/components/[feature-name]/`

```
[feature-name]/
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

#### 3. State Management Layer

**Location**: `src/store/emr/[feature-name]/`

```
[feature-name]/
├── [feature-data-store].ts     # Main data store
├── [navigation-store].ts       # Navigation/UI state
└── [sub-feature]/              # Sub-feature stores
    └── index.ts
```

#### 4. API Queries Layer

**Location**: `src/query/emr/[feature-name]/`

```
[feature-name]/
├── index.ts                     # Main API functions
└── [sub-feature]/              # Sub-feature APIs
    └── index.ts
```

## Real Examples from Codebase

### Lifestyle Feature (✅ Perfect Example)

```
# 1. Routes
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

# 2. Components
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

# 3. State
store/emr/lifestyle/
├── lifestyle-data-store.ts
└── navigation-store.ts

# 4. Queries
query/emr/lifestyle/
└── index.ts
```

### Doctor Profile Feature (✅ Good Example)

```
# 1. Routes
app/(private)/emr/profile/
├── layout.tsx
├── personal-info/
│   └── page.tsx
└── customise/
    └── page.tsx

# 2. Components
[Components are in shared locations for this feature]

# 3. State
store/emr/doctor-profile/
├── personal-info/
│   ├── index.ts
│   └── pincode.ts
└── customise-emr/
    └── index.ts

# 4. Queries
query/emr/doctor-profile/
├── personal-info/
└── customise-emr/
```

## Naming Conventions

### Folders

- **All folders**: Use `kebab-case`
- **Feature names**: Use descriptive, kebab-case names
- **Sub-features**: Use kebab-case, can be nested

Examples:

```
✅ lifestyle/
✅ doctor-profile/
✅ physical-activity/
✅ medical-history-addiction/
❌ Lifestyle/
❌ doctorProfile/
❌ physicalActivity/
```

### Files

- **Route files**: Always `layout.tsx` and `page.tsx`
- **Component files**: Use `PascalCase.tsx`
- **Store files**: Use `kebab-case.ts` with descriptive suffixes
- **Query files**: Usually `index.ts` or descriptive names

Examples:

```
✅ layout.tsx
✅ page.tsx
✅ LifestyleNote.tsx
✅ lifestyle-data-store.ts
✅ navigation-store.ts
✅ index.ts
❌ Layout.tsx
❌ Page.tsx
❌ lifestyleNote.tsx
❌ lifestyleDataStore.ts
```

## Best Practices

### 1. Start with the 4-Layer Structure

For every new feature, create all four layers even if some are initially empty:

- Routes (app directory)
- Components (emr/components)
- State (store/emr)
- Queries (query/emr)

### 2. Use Layouts Effectively

- Create `layout.tsx` for each feature and sub-feature
- Layouts handle navigation, breadcrumbs, and shared UI
- Keep page components focused on content

### 3. Organize Components by Purpose

- Main components in root of feature folder
- Forms in `[feature-name]-forms/` subdirectory
- Mobile-specific components in `mobile/` subdirectory
- Shared components in `shared/` subdirectory

### 4. Separate State Concerns

- Data state (API data, form data)
- UI state (navigation, modals, loading states)
- Use separate files for different concerns

### 5. Group Related APIs

- Keep related API functions together
- Use sub-directories for complex features
- Export everything through index files

## Migration Guide

### For Existing Features

If you have features that don't follow this structure:

1. **Identify the feature boundaries**
2. **Create the 4-layer structure**
3. **Move files gradually** to avoid breaking changes
4. **Update imports** as you move files
5. **Test thoroughly** after each move

### For New Features

1. **Plan the feature structure** before coding
2. **Create all 4 layers** from the start
3. **Follow the naming conventions**
4. **Use existing features as reference**
5. **Document any deviations** and reasons

## Quick Checklist

When creating a new feature:

- [ ] Created routes in `app/(private)/emr/[feature-name]/`
- [ ] Created components in `emr/components/[feature-name]/`
- [ ] Created state in `store/emr/[feature-name]/`
- [ ] Created queries in `query/emr/[feature-name]/`
- [ ] Used kebab-case for all folder names
- [ ] Created layout.tsx for main feature
- [ ] Created page.tsx for main feature
- [ ] Organized sub-features consistently
- [ ] Followed existing patterns from lifestyle/doctor-profile

## Related Documentation

- [Code Format Rules](./CODE_FORMAT_RULES.md) - Complete coding standards
- [Pre-commit Hooks](./PRE_COMMIT_HOOKS.md) - Code quality enforcement
- [Lifestyle Module Guidelines](../lifestyle/LIFESTYLE_BASE.md) - Specific lifestyle patterns
