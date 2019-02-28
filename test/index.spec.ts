import debounce from './../src';

test('debounce', async () => {
  let counter = 0;
  const incr = function(){ counter++; };
  const debouncedIncr = debounce(incr, 32);
  debouncedIncr(); debouncedIncr();
  setTimeout(debouncedIncr, 16);
  setTimeout(function(){ expect(counter).toBe(1)}, 96);
}, 100);

test('debounce cancel', async () => {
  let counter = 0;
  const incr = function(){ counter++; };
  const debouncedIncr = debounce(incr, 32);
  debouncedIncr();
  debouncedIncr.cancel();
  setTimeout(function(){ expect(counter).toBe(0)}, 96);
}, 100);

test('debounce flush', async () => {
  let counter = 0;
  const incr = function(){ counter++; };
  const debouncedIncr = debounce(incr, 32);
  debouncedIncr();
  debouncedIncr.flush();
  expect(counter).toBe(1);
  debouncedIncr();
  setTimeout(function() {
    debouncedIncr.flush();
    expect(counter).toBe(2);
  }, 40);
}, 42);

test('debounce asap', async () => {
  let counter = 0;
  const incr = function(){ return ++counter; };
  const debouncedIncr = debounce(incr, 64, true);
  const a = debouncedIncr();
  const b = debouncedIncr();
  expect(a).toBe(1);
  expect(b).toBe(1);
  expect(counter).toBe(1);
  setTimeout(debouncedIncr, 16);
  setTimeout(debouncedIncr, 32);
  setTimeout(debouncedIncr, 48);
  setTimeout(function(){
    expect(counter).toBe(1);
    const c = debouncedIncr();
    expect(c).toBe(2);
    expect(counter).toBe(2);
  }, 128);
}, 130);

test('debounce asap cancel', async () => {
  let counter = 0;
  const incr = function(){ return ++counter; };
  const debouncedIncr = debounce(incr, 64, true);
  const a = debouncedIncr();
  debouncedIncr.cancel();
  const b = debouncedIncr();
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(counter).toBe(2);
  setTimeout(debouncedIncr, 16);
  setTimeout(debouncedIncr, 32);
  setTimeout(debouncedIncr, 48);
  setTimeout(function(){ expect(counter).toBe(2); }, 128);
}, 130);

test('debounce flush asap', () => {
  let counter = 0;
  const incr = function(){ counter++; };
  const debouncedIncr = debounce(incr, 32, true);
  debouncedIncr();
  debouncedIncr.flush();
  expect(counter).toBe(1);
  setTimeout(function() {
    debouncedIncr.flush();
    expect(counter).toBe(2);
  }, 40);
});

test('debounce asap recursively', async () => {
  let counter = 0;
  const debouncedIncr = debounce(function(){
    counter++;
    if (counter < 10) debouncedIncr();
  }, 32, true);
  debouncedIncr();
  expect(counter).toBe(1);
  setTimeout(function(){ expect(counter).toBe(1); }, 96);
}, 96);

test('debounce re-entrant', async () => {
  const sequence = [
    ['b1', 'b2']
  ];
  let value = '';
  const append = function(this: string, arg: string){
    value += this + arg;
    var args = sequence.pop();
    if (args) {
      debouncedAppend.call(args[0], args[1]);
    }
  };
  const debouncedAppend = debounce(append, 32);
  debouncedAppend.call('a1', 'a2');
  expect(value).toBe('');
  setTimeout(function(){
    expect(value).toBe('a1a2b1b2');
  }, 100);
}, 102);
