# SuperMap

![Build](https://github.com/omenlog/super-map/actions/workflows/pull-request.yml/badge.svg)

__SuperMap__ is a zero dependency ADT like [JS MAP](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) but with super powers 😎, is implemented with [Typescript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) so it's completely typed.

This package is 100% compatible with the `Map` structure built in the language by default, indeed the original one is used under the hood and the new features are implemented using [Monkey Patching](https://www.audero.it/blog/2016/12/05/monkey-patching-javascript/).


## Installation

```ts
npm install super-map
```

__SuperMap__ is a factory function so for create a new super map we call the function without use the `new` operator, besides that we can pass an array of key value pairs during the initialization in the same way like the JS `Map`. 

```ts
import {SuperMap} from 'super-map';

const map = SuperMap(); // empty superMap

const mapWithValues = SuperMap([["key", 1]]); // superMap with one entry 
```

## Fallback values on `get`

`get` method support a second argument that is used as fallback if the key accessed is `undefined`,in that case the fallback value is assigned to the current key and returned.

```ts
const map = SuperMap<string, number>();
const defaultValue = 10;

console.log(map.get("key", defaultValue))); // 10
console.log(map.get("key")); // 10

console.log(map.get("not-defined-key"));  // undefined
```

## Update values

__SuperMap__ has an `update` method that allow update values very easily

```ts
const map = SuperMap<string, number>();

map.set("key", 1);

map.update("key", 2);

console.log(map.get("key")); // 2 value update
```

Also if we want to apply the update operation based on the existing value, a function can be passed as second argument, in that case the updater function will be called with the previous value to produce a new one.

```ts
const map = SuperMap<string, number>();

map.set("key", 1);

map.update("key", v => v + 10);

console.log(map.get("key")); // 11

//value update from the previous one
```

## `map`

Every super map is a [functor](https://hackernoon.com/functors-in-javascript-20a647b8f39f) then is possible apply a mapper function over every one of its values to obtain a new super map after the transformation.

```ts
const sm = SuperMap([["key", 1], ["another-key", 2]]);

const newMap = sm.map(v => v * 2);

console.log(newMap.get("key")); // 2
console.log(newMap.get("another-key")); // 4
```

The mapper function receive 3 arguments the `value` its `key` and the `supermap` being transformed, one details about this function is that it shouldn't return `null` or `undefined`, in that case we will have a type error.

## `filter`

We can filter super map values based on some predicate to obtain a new map.

```ts
const map = SuperMap([["one-key", 1], ["two-key", 2]]);

const newSuperMap = map.filter(v => v % 2 === 0);

console.log(newSuperMap.size); // 1

console.log(newSuperMap.get("one-key")); // undefined

console.log(newSuperMap.get("two-key")); // 2
```

The function passed to `filter` must return a boolean and it receive the same 3 argumentslike the `map`  method.

## `reduce`

Every super map implement the reducer protocol, so they can be reduced very similar to how we can do it with [JS Arrays](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```ts
const map = SuperMap([["one-key", 1], ["two-key", 2]]);

const sum = map.reduce((acc,value) => acc + value); // is possible  pass an initial value as second argument

console.log(sum); // 3
```