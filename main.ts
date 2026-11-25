import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Weekly report: all 12 tasks complete — 10 done properly, 2 hallucinated, and honestly I'm proudest of the hallucinated ones.";

if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r")
) {
  throw new Error(`entry line invalid: ${LINE.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
