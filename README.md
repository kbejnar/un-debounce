# de-bounce

This is an alternative implementation to the 'debounce' npm package, written in TypeScript.

It supports all of the functionality of the Underscore debounce functioin, plus a flush method which can be found in the Lodash implementation.

## Installation

`npm install de-bounce`

## Arguments
<span style=" color: #3492ff;">func (Function)</span>: The function to debounce.

<span style=" color: #3492ff;">[wait=0] (number)</span>: The number of milliseconds to delay.

<span style=" color: #3492ff;">[immediate=false] (Object)</span>: The options object.

## Returns

<span style=" color: #3492ff;">(Function):</span> Returns the new debounced function.

## Example
```javascript
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', _.debounce(calculateLayout, 150));

// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', _.debounce(sendMail, 300, true));


// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);```