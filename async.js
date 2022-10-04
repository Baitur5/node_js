const { readFile } = require('./index');


async function main() {
  const fileA = await readFile("a.txt");
  const fileB = await readFile("b.txt");
  console.log(fileA);
  console.log(fileB);
}


main().catch((e) => {
  console.log(e);
  // process.exit(1);
})

