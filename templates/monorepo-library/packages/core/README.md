# Typescript validation

See [ts-v documentation](https://ts-v.dev)
Validation schema for typescript.

## Quick start

Installation :

```sh
yarn add @ts-v/core
```

Code :

```ts
import { validate } from '@ts-v/core';

// Unknown params
const params = {
  name: 'joe',
  profile: {
    name: { firstname: 'john', lastname: 'doe' },
    role: 'ADMIN',
    age: '25',
  },
};

const { name, profile } = validate(
  params,
  object({
    name: string(),
    profile: object({
      name: object({ firstname: string(), lastname: string() }),
      role: string(),
      age: number(),
    }),
  })

  profile.age = 25
);
```

The returned value of validate function will be typed.

## Validation error

If params don't pass validation it will throw error as a similar object with keys params and string error values.

```ts
import { array, object, validate } from '@ts-v/core';
import { number, oneOf, string } from '@ts-v/kit';

// Unknown params
const params = {
  name: 'joe',
  profile: {
    name: { firstname: 'john', lastname: 'doe' },
    role: 'ADMIN',
    age: 'not-a-number',
  },
};
try {
  const { name, profile } = validate(
    params,
    object({
      name: string(),
      profile: object({
        name: object({ firstname: string(), lastname: string() }),
        role: string(),
        age: number(),
      }),
    })
  );
} catch (error) {
  error = {
    age: 'number',
  };
}
```

## Type schema

Here is the core typed schemas. Each schema is un function wich return a object with data or error.

### array

Parameter takes another schema to defined type element of this array. Value will be an array of the nested schema.

```ts
const [age1, age2, age3, age4] = validate(['25', '32', '43', '56'], array(int()));
```

### object

Parameter takes an object with key of input keys. Value of this object must be others schema to define values of input object.

```ts
const { name, age } = validate(
  { name: 'john', age: '25' },
  object({
    name: string(),
    age: number(),
  })
);
```

### Starter kit

To start with the base shemas you can use [@ts-v/kit](../kit/README.md)

### Custom schema

You can also right your own schema. The only rule is tu return a Schema type with you desired type in generic type.

```ts
import type { Schema } from '@ts-v/core';
```

Schema type is a function that take an unkown value and return an object `{ data , error }`. If value is good error must undefined, if it's not data must be undefined.

Example for a password :

```ts
export const password =
  (error?: string): Schema<string> =>
  (value) => {
    return typeof value === 'string' && value.length > 8 ? { data: value } : { error: error || 'password' };
  };
```

### Custom error

Each schema can take custom error message in parameter.

```ts
const height = validate('150.5', number('This is a custom message for this value'));
```

### Test if is valid

You can use `isValid` method against `validate`.

```ts
if(isValid('150.5', number()))
```
