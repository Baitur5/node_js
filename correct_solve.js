

const a = [
  { code: 'A330', seats: 300 },
  { code: 'su57', seats: 2 },
  { code: 'b777', seats: 710 },
];

const b = [
  { code: 'A330', avia: 'AEROFLOT' },
  { code: 'su57', avia: 'Sukhoi' },
  { code: 'f35', avia: 'LM' },
];

const codes = [...new Set([...a, ...b].map(({ code }) => code))]//getting unique codes

//We are doing it because it is much faster to find element via key rather than using method find
const aMap = a.reduce((prev, curr) => {
  prev[curr.code] = curr;
  return prev
}, {})

const bMap = b.reduce((prev, curr) => {
  prev[curr.code] = curr;
  return prev
}, {})
const res = codes.map((c) => ({
  code: c,
  // Much slower variant
  // seats: (a.find(({ code }) => code == c) || {}).seats || null,
  // avia: (b.find(({ code }) => code == c) || {}).avia || null,

  //Much faster variant
  seats: aMap[c]?.seats || null,
  avia: bMap[c]?.avia || null,
}))

console.log(res)
