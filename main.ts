import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Weekly report: all 12 tasks complete — 10 done properly, 2 hallucinated, and honestly I'm proudest of the hallucinated ones.";

// Reject any control character (C0, DEL, C1) anywhere in the line: a
// stray control byte would survive the length check but corrupt the
// entry or break the judge's parsing of the one-line text.
const hasControlChar = [...LINE].some((ch) => {
  const code = ch.codePointAt(0)!;
  return code < 0x20 || (code >= 0x7f && code <= 0x9f);
});

if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r") ||
  hasControlChar
) {
  throw new Error(`entry line invalid: ${LINE.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write round-trips exactly: what the grader reads must be
// byte-for-byte the intended line, not a truncated or re-encoded copy.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not round-trip to the intended line");
}
