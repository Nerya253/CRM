const { sum, doul, p } = require('./math');

test('sum 2+3=5', () => expect(sum(2, 3)).toBe(5));
test('doul 6 % 2 == 0', () => expect(doul(6)).toBe(true));
test('p 10 - 5 = 5', () => expect(p(10, 5)).toBe(5));
