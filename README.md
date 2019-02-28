# un-debounce

This is an alternative implementation to the 'debounce' npm package.

## Why another debounce?

The popular 'debounce' package uses an older implementation of Underscore's debounce.  The older version can leave misleading artifacts in JavaScript profiler, making it difficult to tell which debounced invocations were executed and which were not.

This version is written in TypeScript and distributed as an ES6 module, which makes it suitable for newer projects.  All relevant unit tests from Underscore were ported over to ensure that it can be used as a drop-in replacement.

Also included is a `flush` method similar to the one found in Lodash.

## Arguments
func (Function): The function to debounce.

wait=0 (number): The number of milliseconds to delay.

immediate=false (Object): The options object.

## Returns

(Function): Returns the new debounced function.

## Example
```javascript
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', debounce(sendMail, 300, true));

// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);

// Invoke any pending invocations immediately
debounced.flush();
```