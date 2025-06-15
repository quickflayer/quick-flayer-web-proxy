# Quick Flayer - Base Development Prompt

## Project Overview

Quick Flayer is a modern web application built with Next.js 14, TypeScript, and Tailwind CSS. This document serves as the foundational guide for all development work on the project.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Forms**: React Hook Form
- **Authentication**: JWT with custom auth system
- **UI Components**: Custom component library
- **Package Manager**: npm

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Shared components
│   ├── auth/             # Authentication components
│   └── ui/               # UI components
├── core/                  # Core system components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Shared utilities and configurations
│   ├── http/             # HTTP client configuration
│   └── store/            # Redux store configuration
├── redux/                 # Redux slices and APIs
│   └── auth/             # Authentication state
├── utils/                 # Utility functions
│   ├── auth/             # Authentication utilities
│   ├── logger.ts         # Logging utility
│   └── try-catch.ts      # Error handling utility
├── types/                 # TypeScript type definitions
├── constants/             # Application constants
└── configs/               # Configuration files
    └── auth/             # Authentication configuration
```

## Code Format Rules

### Naming Conventions

- **Files/Folders**: `kebab-case` (e.g., `user-profile/`, `date-utils.ts`)
- **Components**: `PascalCase` (e.g., `UserProfile.tsx`)
- **Variables/Functions**: `camelCase` (e.g., `userName`, `getUserData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: `PascalCase` (e.g., `UserData`, `AuthResponse`)

### Import Order

```typescript
// 1. React imports (first)
import React, { useState, useCallback, useMemo } from 'react';

// 2. Next.js imports
import { useRouter } from 'next/navigation';

// 3. External dependencies (alphabetical)
import { useForm } from 'react-hook-form';

// 4. @core/** imports
import Button from '@core/ui/button';
import Input from '@core/ui/input';

// 5. @/** imports (grouped by type)
import { useAuth } from '@hooks/use-auth';
import { AUTH_CONFIG } from '@configs/auth/auth.config';
import { logger } from '@utils/logger';

// 6. Relative imports
import './styles.css';
```

### Component Structure

```typescript
// Props interface
interface ComponentProps {
  title: string;
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

// Component definition
const Component = ({ title, onSubmit, isLoading = false }: ComponentProps) => {
  // State hooks
  const [data, setData] = useState<FormData | null>(null);

  // Custom hooks
  const { user } = useAuth();

  // Memoized values
  const processedData = useMemo(() => {
    return data ? processData(data) : null;
  }, [data]);

  // Callbacks
  const handleSubmit = useCallback((formData: FormData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
  }, [onSubmit]);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

// Export with memo
export default React.memo(Component);
```

## Core UI Components

### Button Component (`@core/ui/button`)

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children: React.ReactNode;
}

// Usage
<Button variant="primary" isLoading={isSubmitting}>
  Submit
</Button>
```

### Input Component (`@core/ui/input`)

```typescript
interface InputProps {
  label?: string;
  error?: string;
  id: string;
  type?: string;
}

// Usage
<Input
  id="email"
  label="Email Address"
  type="email"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Radio Component (`@core/ui/radio`)

```typescript
interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

// Usage
<Radio
  name="role"
  value="admin"
  label="Administrator"
  checked={selectedRole === 'admin'}
  onChange={setSelectedRole}
/>
```

### Checkbox Component (`@core/ui/checkbox`)

```typescript
interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

// Usage
<Checkbox
  id="terms"
  label="I agree to the terms"
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
/>
```

### Select Component (`@core/ui/select`)

```typescript
interface SelectProps {
  id: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

// Usage
<Select
  id="country"
  label="Country"
  options={countryOptions}
  value={selectedCountry}
  onChange={setSelectedCountry}
  error={errors.country?.message}
/>
```

## React Performance Optimization

### React.memo Usage

```typescript
// Always export components with memo
const ExpensiveComponent = ({ data, onUpdate }: Props) => {
  return <div>{/* Component content */}</div>;
};

export default React.memo(ExpensiveComponent);

// With custom comparison
const Component = React.memo(({ user, settings }: Props) => {
  return <div>{/* Content */}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
```

### useMemo Usage

```typescript
const Component = ({ items, filter }: Props) => {
  // Expensive computation
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  // Complex object creation
  const chartData = useMemo(() => {
    return {
      labels: filteredItems.map(item => item.name),
      datasets: processDatasets(filteredItems)
    };
  }, [filteredItems]);

  return <Chart data={chartData} />;
};
```

### useCallback Usage

```typescript
const Component = ({ onSave, items }: Props) => {
  // Event handlers
  const handleSubmit = useCallback((data: FormData) => {
    if (onSave) {
      onSave(data);
    }
  }, [onSave]);

  // Functions passed to child components
  const handleItemClick = useCallback((itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      processItem(item);
    }
  }, [items]);

  return (
    <form onSubmit={handleSubmit}>
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </form>
  );
};
```

## State Management Patterns

### Redux Toolkit Slice

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
```

### RTK Query API

```typescript
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: query(),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
```

## Custom Hooks Patterns

```typescript
// Data fetching hook
const useUserData = (userId: string) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const user = await getUserById(userId);
      setData(user);
    } catch (error) {
      logger.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { data, loading, refetch: fetchUser };
};

// Form hook
const useFormValidation = (initialValues: FormData) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((data: FormData) => {
    const newErrors: Record<string, string> = {};

    if (!data.email) {
      newErrors.email = 'Email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  return { values, errors, validate, setValues };
};
```

## Error Handling Patterns

### Try-Catch Utility

```typescript
import { tryCatch } from '@utils/try-catch';

// Usage in components
const handleSubmit = async (data: FormData) => {
  const result = await tryCatch(async () => {
    return await submitForm(data);
  });

  if (result.success) {
    logger.log('Form submitted successfully');
    onSuccess(result.data);
  } else {
    logger.error('Form submission failed:', result.error);
    setError(result.error.message);
  }
};
```

### Logger Usage

```typescript
import { logger } from '@utils/logger';

// Different log levels
logger.log('User logged in:', user.email);
logger.warn('Deprecated API usage detected');
logger.error('Authentication failed:', error);
logger.debug('Component rendered with props:', props);
```

## Authentication Patterns

### Protected Route Component

```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : null;
};
```

### Auth Hook Usage

```typescript
const Component = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    }
  }, [login, router]);

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user?.firstName}!</div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};
```

## Form Handling Patterns

### React Hook Form Integration

```typescript
interface FormData {
  email: string;
  password: string;
  firstName: string;
}

const FormComponent = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<FormData>();

  const password = watch('password');

  const onFormSubmit = useCallback(async (data: FormData) => {
    const result = await tryCatch(() => onSubmit(data));

    if (result.success) {
      logger.log('Form submitted successfully');
    } else {
      logger.error('Form submission failed:', result.error);
    }
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Input
        id="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
```

## API Integration Patterns

### RTK Query Hook Usage

```typescript
const UserProfile = ({ userId }: Props) => {
  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useGetUserQuery(userId);

  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = useCallback(async (userData: Partial<User>) => {
    try {
      await updateUser({ id: userId, ...userData }).unwrap();
      logger.log('User updated successfully');
    } catch (error) {
      logger.error('Failed to update user:', error);
    }
  }, [updateUser, userId]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>{user?.firstName} {user?.lastName}</h1>
      <EditUserForm user={user} onSubmit={handleUpdate} />
    </div>
  );
};
```

## Constants Usage

```typescript
import { API_ENDPOINTS, ERROR_MESSAGES, VALIDATION } from '@constants/index';

// API endpoints
const response = await fetch(API_ENDPOINTS.AUTH.LOGIN);

// Error messages
setError(ERROR_MESSAGES.LOGIN_FAILED);

// Validation rules
const isValidEmail = VALIDATION.EMAIL_REGEX.test(email);
```

## Development Guidelines

### Code Quality Rules

1. **No Comments**: Code should be self-documenting
2. **TypeScript Strict**: Always use proper typing
3. **React.memo**: Export all components with memo
4. **Performance**: Use useMemo and useCallback appropriately
5. **Error Handling**: Always use try-catch utility
6. **Logging**: Use logger utility for all logging
7. **Constants**: Use constants from constants file
8. **Validation**: Use consistent validation patterns

### Component Creation Checklist

- [ ] Props interface defined
- [ ] Component uses React.memo
- [ ] Proper import order
- [ ] useMemo for expensive computations
- [ ] useCallback for event handlers
- [ ] Error handling with try-catch utility
- [ ] Logging with logger utility
- [ ] TypeScript strict typing
- [ ] Responsive design
- [ ] Accessibility considerations

### File Naming Rules

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Hooks: `use-hook-name.ts`
- Types: `kebab-case.types.ts`
- Constants: `kebab-case.constants.ts`

### Testing Approach

- Write tests for all components
- Test user interactions
- Test error scenarios
- Mock external dependencies
- Use React Testing Library
- Follow AAA pattern (Arrange, Act, Assert)

This base prompt serves as the foundation for all development work on Quick Flayer. Follow these patterns and guidelines to maintain consistency and quality across the codebase.

```

```
