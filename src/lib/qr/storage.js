// storage.js — localStorage tracking
export function getAllNotes() {
  try {
    return JSON.parse(localStorage.getItem("fytrup-notes")||"[]");
  } catch { return []; }
}
export function hasNote(id) {
  return getAllNotes().includes(id);
}
export function addNote(id) {
  const arr=getAllNotes();
  if(!arr.includes(id)) {
    arr.push(id);
    localStorage.setItem("fytrup-notes", JSON.stringify(arr));
  }
}
