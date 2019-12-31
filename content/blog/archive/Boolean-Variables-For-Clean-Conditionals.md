---
title: Boolean Variables For Clean Conditionals
slug: 'blog/boolean-variables-for-clean-conditionals'
date: '2019-05-30'
author: 'Lee'
description: 'A quick tip to cleanup some of your code 🧹'
categories: ['tips', 'development']
keywords: ['tips', 'development']
---

Writing clean, readable code is an everlasting journey that unforutantely forces you to _experience_ poorly written code and devise ways to overcome it. You can read all the books you want about
the subject (I recommend [Clean Code by Robert Martin](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), FYI) but you'll develop the best practices through, uh,
practice!

When writing complex control flow, sometimes your conditionals can get absolutely out of whack with a ton of conditions to be met. Take this code for example:

```js
function handleServerErrors(error) {
    // we need to determine that it is indeed a server error,
  // a specific response code, and we're not already on the
  // error page
  if ([500, 401, 501].includes(error.code)
      && error.errorType === 'A04F'
      && !router.pathname.includes('error-page')) {
    // handle our error here
    ...
  }
}
```

While that code is _mostly_ easy to read (and probably a poor example), our conditional is 120 columns in length and could take a future developer a bit longer than we'd want to try and
figure out exactly what that guard is doing. An easy fix is to break each condition into it's own variable–this breaks each part of the condition out and makes it easy to test/change in the future if
needed. There's something to be said about performance here as initializing a bunch of variables will take up memory, but honestly, in most cases the benefits would outweight the performance cost:

```js
function handleServerErrors(error) {
  // we need to determine that it is indeed a server error,
  // a specific response code, and we're not already on the
  // error page
  const isSeriousCode = [404, 401, 501].includes(error.code);
  const isServerError = error.errorType === 'A04F';
  const isOnErrorPage = !router.pathname.includes('error-page');

  if (isSeriousCode && isServerError && !isOnErrorPage) {
    // handle our error here
    ...
  }
}
```

Yes, we have a few more lines of code here but it's much easier to reason about. You can read the conditions as a sentence: if it's a serious status code, and a server error, and we're not already on the error page, do the thing!

Try these in your next project if you see your conditionals reaching ridiculous lengths–it can help clean up the readability of your code and save you time when working through issues.
