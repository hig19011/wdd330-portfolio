function squareRoot(number) {
  'use strict'
  if(number < 0) {
    throw new RangeError("You can't find the square root of negative numbers")
  }
  return Math.sqrt(number)
};

test('square root of 4 is 2', () => {
  expect(squareRoot(4)).toBe(2);
});


test('square root of -4 is error', () => {
  expect(()=>squareRoot(-4)).toThrow(RangeError);
});

