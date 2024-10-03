# typesafe-deep-paths

A TypeScript utility package to safely access and modify deeply nested properties within objects using typed string paths. Provides type-safe path autocompletion for known paths while allowing fallback values for paths that may not exist.

## Features

- **Type-safe path autocompletion**: Access nested properties with autocompletion for valid paths.
- **Fallback support**: Define fallback values for paths that may not exist.
- **Flexible access**: Handles both known and unknown paths in objects.
- **Deeply nested property access**: Easily get and set deeply nested properties using string paths.

## Installation

```bash
npm install typesafe-deep-paths
```

## Usage

### `getPath`

The `getPath` function allows you to retrieve the value of a deeply nested property in an object based on a string path. If the path doesn't exist, you can provide a fallback value.

#### Syntax:

```typescript
getPath<T, P extends Path<T> | string, F>(obj: T, path: P, defaultValue?: F): P extends Path<T> ? any : F;
```

- **`T`**: The object type from which the property is being accessed.
- **`P`**: A string representing the path to the property (type-safe if the path exists in the object).
- **`F`**: The fallback value type to return if the path does not exist.

#### Example:

```typescript
const data = {
  user: {
    profile: {
      name: 'Alice',
      address: {
        street: 'Main St',
        city: 'Somewhere',
      },
    },
  },
};

// Accessing a known path - returns the correct value
const street = getPath(data, 'user.profile.address.street');  // 'Main St'

// Accessing an unknown path - returns the default value
const zipCode = getPath(data, 'user.profile.address.zipCode', '00000');  // '00000' (default value)

// Using fallback with unknown path
const age = getPath(data, 'user.profile.age', 30);  // 30 (default since 'age' is missing)
```

### `setPath`

The `setPath` function allows you to set the value of a deeply nested property in an object based on a string path. If intermediate objects in the path do not exist, they will be created automatically.

#### Syntax:

```typescript
setPath<T, P extends Path<T>>(obj: T, path: P, value: any): void;
```

- **`T`**: The object type in which the property is being set.
- **`P`**: A string representing the path to the property (type-safe).
- **`value`**: The value to set at the specified path.

#### Example:

```typescript
const data = {
  user: {
    profile: {
      name: 'Alice',
    },
  },
};

// Setting a nested property
setPath(data, 'user.profile.address.street', 'Elm St');
console.log(data.user.profile.address.street);  // 'Elm St'

// Creating intermediate objects while setting a value
setPath(data, 'user.profile.contact.email', 'alice@example.com');
console.log(data.user.profile.contact.email);  // 'alice@example.com'
```

## TypeScript Support

The package uses TypeScript's advanced types to provide autocompletion and type checking for known object paths. When accessing a known path, TypeScript will suggest the valid nested keys and check for correct types. For unknown paths, you can use fallback values to ensure safe access.

### `Path<T>`

The utility type `Path<T>` is used internally to extract and represent all possible string paths from an object type `T`. It enables autocompletion for nested paths.
