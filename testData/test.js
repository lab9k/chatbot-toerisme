var a = [{ name: 'tc_001' }, { name: 'tc_002' }, { name: 'tc_003' }];
// a = a.reduce((p, c) => (c.name !== 'tc_001' && p.push(c), p), []);
const match = [];
const c = a.reduce(function(pre, curr) {
  if (curr.name !== 'tc_001') {
    pre.push(curr);
  } else {
    match.push(curr);
  }
  return pre;
}, []);
console.log(a);
console.log(c);
console.log(match);
