# Quick Flayer Component Library

## Overview

This document provides a comprehensive guide to the Quick Flayer component library, including all core UI components, usage patterns, and best practices.

## Core UI Components

### Form Components

#### Button (`@core/ui/button`)
```typescript
<Button variant="primary" isLoading={isSubmitting}>
  Submit
</Button>

<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger'
- `isLoading`: boolean
- `disabled`: boolean
- Standard button HTML attributes

#### Input (`@core/ui/input`)
```typescript
<Input
  id="email"
  label="Email Address"
  type="email"
  placeholder="name@example.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

**Props:**
- `id`: string (required)
- `label`: string
- `error`: string
- `type`: string
- Standard input HTML attributes

#### Select (`@core/ui/select`)
```typescript
<Select
  id="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ]}
  placeholder="Select a country"
  error={errors.country?.message}
  {...register('country')}
/>
```

**Props:**
- `id`: string (required)
- `label`: string
- `options`: Array<{ value: string; label: string; disabled?: boolean }>
- `placeholder`: string
- `error`: string
- `helperText`: string

#### Textarea (`@core/ui/textarea`)
```typescript
<Textarea
  id="description"
  label="Description"
  placeholder="Enter description..."
  rows={4}
  resize="vertical"
  error={errors.description?.message}
  {...register('description')}
/>
```

**Props:**
- `id`: string (required)
- `label`: string
- `error`: string
- `helperText`: string
- `resize`: 'none' | 'vertical' | 'horizontal' | 'both'
- Standard textarea HTML attributes

#### Radio (`@core/ui/radio`)
```typescript
<Radio
  name="role"
  value="admin"
  label="Administrator"
  description="Full system access"
  checked={selectedRole === 'admin'}
  onChange={() => setSelectedRole('admin')}
/>
```

**Props:**
- `name`: string (required)
- `value`: string (required)
- `label`: string (required)
- `description`: string
- `error`: string
- Standard input HTML attributes

#### Checkbox (`@core/ui/checkbox`)
```typescript
<Checkbox
  id="terms"
  label="I agree to the terms"
  description="Please read our terms and conditions"
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
  error={errors.terms?.message}
/>
```

**Props:**
- `id`: string (required)
- `label`: string (required)
- `description`: string
- `error`: string
- `indeterminate`: boolean
- Standard input HTML attributes

### Feedback Components

#### LoadingSpinner (`@core/ui/loading-spinner`)
```typescript
<LoadingSpinner size="lg" color="blue" text="Loading..." />

<LoadingSpinner size="sm" color="white" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `color`: 'blue' | 'gray' | 'white' | 'red' | 'green'
- `text`: string
- `className`: string

#### ErrorMessage (`@core/ui/error-message`)
```typescript
<ErrorMessage 
  error="Something went wrong" 
  variant="card" 
  onRetry={handleRetry}
/>

<ErrorMessage 
  error={apiError} 
  variant="inline" 
  showIcon={false}
/>
```

**Props:**
- `error`: string | Error | { message: string } | null
- `title`: string
- `variant`: 'inline' | 'card' | 'banner'
- `onRetry`: () => void
- `showIcon`: boolean
- `className`: string

## Usage Patterns

### Form Handling with React Hook Form

```typescript
const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    const result = await tryCatch(() => submitData(data));
    
    if (result.success) {
      logger.log('Form submitted successfully');
    } else {
      logger.error('Form submission failed:', result.error);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: VALIDATION.EMAIL_REGEX,
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

### Loading States

```typescript
const DataComponent = () => {
  const { data, isLoading, error } = useGetDataQuery();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading data..." />;
  }

  if (error) {
    return <ErrorMessage error={error} variant="card" />;
  }

  return <div>{/* Render data */}</div>;
};
```

### Conditional Rendering

```typescript
const ConditionalForm = ({ isReadOnly }: Props) => {
  return (
    <div>
      <Input
        id="name"
        label="Name"
        disabled={isReadOnly}
        {...register('name')}
      />
      
      {!isReadOnly && (
        <Button type="submit">
          Save Changes
        </Button>
      )}
    </div>
  );
};
```

## Performance Optimization

### React.memo Usage
All components are exported with `React.memo` for automatic re-render optimization.

### useMemo for Expensive Computations
```typescript
const expensiveOptions = useMemo(() => {
  return data.map(item => ({
    value: item.id,
    label: `${item.name} (${item.category})`
  }));
}, [data]);
```

### useCallback for Event Handlers
```typescript
const handleSubmit = useCallback(async (data: FormData) => {
  await submitForm(data);
}, []);

const handleChange = useCallback((value: string) => {
  setValue('field', value);
}, [setValue]);
```

## Accessibility Features

- **ARIA Labels**: All components include proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Semantic HTML and proper labeling
- **Focus Management**: Logical tab order and focus indicators
- **Error Announcements**: Errors are properly associated with form fields

## Styling Guidelines

### Consistent Design System
- **Colors**: Blue primary, gray neutrals, semantic colors for states
- **Spacing**: Consistent padding and margins using Tailwind classes
- **Typography**: Clear hierarchy with proper font weights
- **Shadows**: Subtle elevation for cards and modals
- **Borders**: Rounded corners for modern appearance

### Responsive Design
All components are mobile-first and responsive:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input id="firstName" label="First Name" />
  <Input id="lastName" label="Last Name" />
</div>
```

## Error Handling

### Form Validation
```typescript
<Input
  id="password"
  label="Password"
  type="password"
  error={errors.password?.message}
  {...register('password', {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain uppercase, lowercase, and number'
    }
  })}
/>
```

### API Error Handling
```typescript
const handleSubmit = async (data: FormData) => {
  const result = await tryCatch(() => api.submitForm(data));
  
  if (!result.success) {
    setError(result.error.message || 'Submission failed');
  }
};
```

## Import Patterns

### Individual Imports
```typescript
import Button from '@core/ui/button';
import Input from '@core/ui/input';
```

### Bulk Imports
```typescript
import { Button, Input, Select, Checkbox } from '@core/ui';
```

## Testing

### Component Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@core/ui/button';

test('button shows loading state', () => {
  render(<Button isLoading>Submit</Button>);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### Form Testing
```typescript
test('form validation works', async () => {
  render(<MyForm />);
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(await screen.findByText('Email is required')).toBeInTheDocument();
});
```

This component library provides a solid foundation for building consistent, accessible, and performant user interfaces in the Quick Flayer application.
