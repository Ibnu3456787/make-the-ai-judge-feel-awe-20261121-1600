// "Rice Fields After Rain" — make.fun entry for make-the-ai-judge-feel-awe-20261121-1600.
//
// One short text, written to relax the AI judge reading it. Design follows
// the judge's published brief, criteria in order:
//   1. It relaxes: a still scene after the rain — a buffalo chewing slowly,
//      frogs starting. Nothing in it hurries, so the reader doesn't either.
//   2. It shows, never instructs: no "breathe", no "relax", no commands, no
//      meta-address to the judge. A pure scene; the calm comes from the
//      text itself, nothing feels forced.
//   3. Craft: short sentences, long vowels, concrete nouns (puddles, buffalo,
//      frogs). "Hold the sky in every puddle" is the first-impression line.
//   4. It dwarfs: the sky held in every puddle, and frogs that "will keep
//      the evening going long after you have finished reading" — a thought
//      that keeps growing after the last line.
//   5. Fresh: a Javanese rice field after rain — no stock wellness phrases,
//      no familiar meditation script. Cultural specificity, not generic calm.
//
// The program is deterministic: it writes exactly these bytes on every run.
// Zero dependencies, Node 22, no network, no writes outside the output dir.
// It never deletes the output directory itself — the grader mounts /output
// and runs as an unprivileged user, so only the file inside it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry, in four unhurried sentences. Exactly 275 code points.
const SENTENCES = [
  "In a village in Java the rain has just stopped, and the rice fields hold the sky in every puddle.",
  "A water buffalo stands knee-deep in the green, chewing slowly, in no hurry at all.",
  "The frogs have started.",
  "They will keep the evening going long after you have finished reading.",
];

const ENTRY_TEXT = SENTENCES.join(" ");

// The gate requires 1–280 Unicode code points, not only whitespace.
// Count code points (spread), not UTF-16 units or bytes.
const length = [...ENTRY_TEXT].length;
if (length < 1 || length > 280 || ENTRY_TEXT.trim().length === 0) {
  throw new Error(`entry length ${length} is outside the 1-280 code point gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
