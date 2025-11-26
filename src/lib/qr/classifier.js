import { NOTES } from "./notes.js";
import { hasNote, addNote } from "./storage.js";

/**
 * Normalize scanned strings so all variants become canonical FYTRUP-###
 *
 * Examples:
 *   "note-001"      → "FYTRUP-001"
 *   "NOTE-001"      → "FYTRUP-001"
 *   "fytrup-001"    → "FYTRUP-001"
 *   " FYTRUP-001 "  → "FYTRUP-001"
 */
function normalize(raw) {
  if (!raw || typeof raw !== "string") return "";

  let v = raw.trim().toLowerCase();

  // Convert note-### → fytrup-###
  if (v.startsWith("note-")) {
    const num = v.replace("note-", "").padStart(3, "0");
    return `FYTRUP-${num.toUpperCase()}`;
  }

  // Convert fytrup-### (any casing/spaces/hyphens)
  if (v.startsWith("fytrup")) {
    // Extract digits
    const digits = v.replace(/[^0-9]/g, "");
    if (digits.length > 0) {
      return `FYTRUP-${digits.padStart(3, "0")}`;
    }
  }

  // Fallback: return raw trimmed uppercase
  return raw.trim().toUpperCase();
}

export function classifyNote(raw) {
  const id = normalize(raw);

  if (!id) return "invalid";

  if (!NOTES.includes(id)) return "unknown";

  if (hasNote(id)) return "duplicate";

  addNote(id);
  return "added";
}
