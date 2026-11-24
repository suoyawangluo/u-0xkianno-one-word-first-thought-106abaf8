import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word, First Thought — the first word that came to mind:
// petrichor — the scent of rain on dry earth. Surprising, vivid, specific.
const WORD = "petrichor";

function gate(word: string): void {
  const points = [...word];
  if (points.length < 1 || points.length > 24) {
    throw new Error(`gate: word must be 1-24 characters, got ${points.length}`);
  }
  if (!/\S/.test(word)) {
    throw new Error("gate: word must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("gate: entry must be exactly one word, no spaces");
  }
}

gate(WORD);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Read it back and verify the file holds exactly the word, byte for byte.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error(`verify: entry.txt holds ${JSON.stringify(back)}, expected ${JSON.stringify(WORD)}`);
}
console.log(`wrote ${outPath} (${[...WORD].length} code points)`);
console.log(`verified ${outPath} holds exactly ${JSON.stringify(back)}`);
