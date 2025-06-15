# Validation Test Guide

## API Error Response Format

The backend returns validation errors in this format:
```json
{
    "message": [
        "Email is required",
        "Please provide a valid email address",
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character",
        "Password must be at least 8 characters long",
        "Password is required",
        "password must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

## Frontend Validation Rules

### Email Validation
- **Required**: "Email is required"
- **Pattern**: "Please provide a valid email address"
- **Regex**: `/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i`

### Password Validation
- **Required**: "Password is required"
- **Min Length**: "Password must be at least 8 characters long"
- **Pattern**: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character"
- **Regex**: `/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`

### Name Validation (Optional)
- **First Name**: Optional field, minimum 2 characters if provided
- **Last Name**: Optional field, minimum 2 characters if provided

### Confirm Password
- **Required**: "Please confirm your password"
- **Match**: "Passwords do not match"

## Test Cases

### Valid Registration Data
```json
{
  "email": "test@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Invalid Test Cases

#### 1. Empty Form
- Should show: "Email is required", "Password is required"

#### 2. Invalid Email
```json
{
  "email": "invalid-email",
  "password": "Password123!"
}
```
- Should show: "Please provide a valid email address"

#### 3. Weak Password
```json
{
  "email": "test@example.com",
  "password": "weak"
}
```
- Should show: "Password must be at least 8 characters long", "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character"

#### 4. Password Mismatch
```json
{
  "email": "test@example.com",
  "password": "Password123!",
  "confirmPassword": "DifferentPassword123!"
}
```
- Should show: "Passwords do not match"

## Password Strength Indicator

The password strength component shows:
- **Progress bar** with 4 levels (red → orange → yellow → green)
- **Requirements checklist**:
  - ✓ At least 8 characters
  - ✓ Contains uppercase letter
  - ✓ Contains lowercase letter
  - ✓ Contains number or special character

## Error Handling

### Frontend Error Display
- Individual field errors shown below each input
- API errors displayed in a card at the top of the form
- Array of error messages joined with commas

### Backend Error Parsing
The `tryCatch` utility now handles:
- RTK Query errors with `data.message` arrays
- Standard Error objects
- Unknown error types with fallback messages

## Testing Steps

1. **Start the development server**:
   ```bash
   cd app/quick-flayer-web
   npm run dev
   ```

2. **Navigate to register page**:
   - Go to `http://localhost:3000`
   - Should redirect to `/login`
   - Click "Create one" to go to `/register`

3. **Test validation**:
   - Try submitting empty form
   - Enter invalid email
   - Enter weak password
   - Check password strength indicator
   - Test password confirmation mismatch

4. **Test successful registration**:
   - Enter valid data
   - Should redirect to dashboard
   - Check user is logged in

## Expected Behavior

### Client-side Validation
- Immediate feedback on form fields
- Password strength indicator updates in real-time
- Form submission blocked if validation fails

### Server-side Validation
- API errors displayed clearly
- Multiple error messages handled properly
- User-friendly error formatting

### Success Flow
- Successful registration stores token
- User redirected to dashboard
- Authentication state updated
- User can access protected routes

## Troubleshooting

### Common Issues
1. **"password must be a string"** - Check form data serialization
2. **Multiple email errors** - Ensure frontend validation matches backend
3. **Token not stored** - Check `storeToken` and `setCredentials` calls
4. **Redirect not working** - Verify auth state updates

### Debug Tips
- Check browser network tab for API requests
- Verify form data being sent
- Check Redux DevTools for state changes
- Look at console for any JavaScript errors
