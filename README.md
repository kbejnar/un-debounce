# de-bounce

This is an alternative implementation to the 'debounce' npm package, written in TypeScript.

It supports all of the functionality of the Underscore debounce functioin, plus a flush method which can be found in the Lodash implementation.

## Installation

`npm install de-bounce`

## Arguments
func (Function): The function to debounce.

[wait=0] (number): The number of milliseconds to delay.

[immediate=false] (Object): The options object.

## Returns

(Function): Returns the new debounced function.

## Example
```javascript
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', debounce(sendMail, 300, true));


// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);```