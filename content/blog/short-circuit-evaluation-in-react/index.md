---
slug: 'blog/short-circuit-evaluation-in-react'
date: '2020-01-23'
title: 'Short-circuit Evaluation in React'
author: 'Lee'
description: 'Inline conditional rendering in React–but the gotchas!'
categories: ['javascript', 'react', 'development', 'tips']
keywords: ['javascript', 'react', 'development', 'tips']
banner: './images/banner.jpg'
photographer: 'Matheus Cenali via Unsplash'
photographerUrl: 'https://unsplash.com/@cenali?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
---

When you're new to React, or JavaScript in general, you'll commonly see this syntax out in the wild and in tutorials:

```jsx
function MyComponent(props) {
  const { headerCopy } = props;
  return <div>{headerCopy && <h1>{headerCopy}</h1>}</div>;
}
```

That weird syntax on the fifth line is known as [short-circuit evaluation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Short-circuit_evaluation). This pattern can be used to conditionally render components in React, however, there's a few gotchas.

What do you think this piece of code will render if `headerCopy` is equal to `0`?

```jsx
function MyComponent(props) {
  const headerCopy = 0;
  return <div>{headerCopy && <em>{headerCopy}</em>}</div>;
}
```

The answer here is **a non-emphasized 0.** Why? Since `0` is a false-y value and not one that React specifically ignores, you'll run into the "short-circuit" effect of this pattern– a zero will be rendered instead of _nothing_, which is likely what you would have wanted in this case.

## But, how do I use this properly?

It's pretty simple–you just have to remember a few rules. React will render anything that is not `typeof`, `undefined`, or a `Boolean`. So, in this instance, you have a few options.

### Cast as a Boolean

Since `Boolean` is one of the types that React **_knows_** not the render, we can explicitly cast our value as a `Boolean` :

```jsx
function MyComponent(props) {
  const { headerCopy } = props;
  return <div>{Boolean(headerCopy) && <em>{headerCopy}</em>}</div>;
}
```

This won't be short-circuited as `Boolean(headerCopy)` will still evaluate to true **_but_** React knows not to render it.

### The Bang-Bang / Not Not / Double Bang Operator (!!)

If you've never seen that before, it's basically a shorter way to cast as a `Boolean`. If you're familiar with logical operators, you know that prefixing a value with a Bang (`!`) operator reverses the value of it. The only way to do this is to _cast it as a Boolean_, so JavaScript does that for you. The SECOND Bang flips it back to it's **_original truth-y/false-y value_** while keeping it casted as a `Boolean`. Confused? That's normal! Let's look at some examples:

```jsx
!true; // Evaluates to false
!false; // Evaluates to true
!'Hello'; // Evaluates to false
!''; // Evaluates to true

// The DOUBLE BANG!
!!true; // Evaluates to true!
!!false; // Evaluates to false!
!!'Hello'; // Evaluates to true!
!!''; // Evaluates to false!
```

With those examples in mind, what do you think `!!0` would evaluate to? If you guessed `false`, you're right! Since `0` is **_false-y_**, and we're casting it, reversing it, and then flipping it back, it evaluates to it's associated `Boolean` value. So, how do we use that as a replacement to fix our short-circuit evaluations? Like this:

```jsx
function MyComponent(props) {
  const { headerCopy } = props;
  return <div>{!!headerCopy && <em>{headerCopy}</em>}</div>;
}
```

Boom! No worries about the actual type of the prop you're using on the left-side of the evaluation. Things will work as expected.

### Ternary Conditionals

The last option for in-line conditional rendering involves doing a full ternary conditional. These are my preference as I often have a **false** state that I want to render for in the condition.

```jsx
function MyComponent(props) {
  const { headerCopy } = props;
  return (
    <div>
      {headerCopy ? <em>{headerCopy}</em> : <strong>N/A</strong>}
    </div>
  );
}
```

If you don't want to render anything in one of the conditions, simply pass `null` and React will ignore it:

```jsx
function MyComponent(props) {
  const { headerCopy } = props;
  return <div>{headerCopy ? <em>{headerCopy}</em> : null}</div>;
}
```

## Summary

In addition to these three methods, you can also things like bringing your component logic outside of the render and prepare it beforehand. It all depends on your preference though an argument could be made for readability of the above three options versus long-winded if/else blocks to determine which component to render. But, that's a topic for another post! 👋🏻
