# Field Controllers Guide

## Overview

Your project includes a comprehensive set of controlled form components that integrate seamlessly with `react-hook-form`. These components provide consistent styling, validation, and error handling.

## Available Controllers

### 1. TextFieldController

- **Purpose**: Text input fields (email, password, text, etc.)
- **Props**: Extends `AppTextFieldProps` + base controller props
- **Usage**: Standard text inputs with validation

### 2. NumberFieldController

- **Purpose**: Numeric input fields
- **Props**: Base controller props only
- **Usage**: Number inputs with built-in numeric validation

### 3. SelectController

- **Purpose**: Single-select dropdown
- **Props**: Extends `SingleSelectProps<S>` + base controller props
- **Usage**: Dropdown selection with options

### 4. MultiSelectController

- **Purpose**: Multi-select dropdown
- **Props**: Extends `MultiSelectProps<S>` + base controller props
- **Usage**: Multiple option selection

### 5. RadioController

- **Purpose**: Radio button groups
- **Props**: Extends `AppRadioProps` + base controller props
- **Usage**: Single selection from multiple options

### 6. SwitchController

- **Purpose**: Toggle switches
- **Props**: Extends `AppSwitchProps` + base controller props
- **Usage**: Boolean on/off controls

### 7. FileUploadController

- **Purpose**: File upload with optional image cropping
- **Props**: Base props + `imageUrl`, `cropWidth`, `cropHeight`
- **Usage**: File uploads and image handling

## Base Props (Common to All Controllers)

```typescript
type BaseProps<T> = {
  name: Path<T>; // Field name (typed path)
  control: Control<T>; // React Hook Form control
  label?: string; // Field label
  isRequired?: boolean; // Required field indicator
  disabled?: boolean; // Disable field
};
```

## Basic Usage Example

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextFieldController,
  SelectController,
  RadioController,
  SwitchController
} from '@/components/field-controller';

// Define form schema
const formSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.object({ value: z.string(), label: z.string() }),
  gender: z.string(),
  notifications: z.boolean()
});

type FormData = z.infer<typeof formSchema>;

const MyForm = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      role: null,
      gender: '',
      notifications: false
    }
  });

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'user', label: 'User' },
    { value: 'moderator', label: 'Moderator' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextFieldController
        name="email"
        control={control}
        label="Email"
        type="email"
        isRequired
      />

      <TextFieldController
        name="name"
        control={control}
        label="Full Name"
        isRequired
      />

      <SelectController
        name="role"
        control={control}
        label="Role"
        options={roleOptions}
        isRequired
      />

      <RadioController
        name="gender"
        control={control}
        label="Gender"
        options={genderOptions}
      />

      <SwitchController
        name="notifications"
        control={control}
        label="Enable Notifications"
      />
    </form>
  );
};
```

## Key Features

- **Type Safety**: Full TypeScript support with generic types
- **Validation**: Automatic error display from react-hook-form
- **Consistent Styling**: Uses your app's design system
- **Performance**: Optimized with `gMemo` utility
- **Accessibility**: Built-in ARIA support
- **Mobile Responsive**: Works on all device sizes

## Common Patterns

### Password Field with Strength Indicator

```typescript
import PasswordStrength from '@/core/components/PasswordStrength';

const password = watch('password'); // Watch password field

<TextFieldController
  name="password"
  control={control}
  label="Password"
  type="password"
  isRequired
/>
{password && <PasswordStrength password={password} />}
```

### Conditional Fields

```typescript
const userType = watch('userType');

{userType?.value === 'admin' && (
  <TextFieldController
    name="adminCode"
    control={control}
    label="Admin Code"
    isRequired
  />
)}
```

### Dynamic Options

```typescript
const [options, setOptions] = useState<BaseOption[]>([]);

useEffect(() => {
  // Fetch options from API
  fetchOptions().then(setOptions);
}, []);

<SelectController
  name="category"
  control={control}
  options={options}
  loading={options.length === 0}
/>
```

### Form Sections

```typescript
<Stack spacing={4}>
  <Box>
    <Typography variant="h6">Personal Info</Typography>
    <Stack spacing={2}>
      <TextFieldController name="firstName" control={control} />
      <TextFieldController name="lastName" control={control} />
    </Stack>
  </Box>

  <Box>
    <Typography variant="h6">Contact Info</Typography>
    <Stack spacing={2}>
      <TextFieldController name="email" control={control} />
      <TextFieldController name="phone" control={control} />
    </Stack>
  </Box>
</Stack>
```

## Best Practices

1. **Always use with react-hook-form**: These controllers are designed specifically for controlled forms
2. **Define proper TypeScript types**: Use Zod schemas for type safety
3. **Provide meaningful labels**: Always include descriptive labels
4. **Handle validation**: Use proper validation schemas
5. **Use appropriate controller**: Choose the right controller for your data type
6. **Group related fields**: Use Stack and Box for logical grouping
7. **Provide loading states**: Show loading indicators for async operations
8. **Use proper autocomplete**: Add autocomplete attributes for better UX

## Examples Available

- `CompleteFormExample.tsx`: Demonstrates all field controllers
- `AuthFormExample.tsx`: Login/Register forms with password strength
- Check `/src/examples/` for more practical implementations
