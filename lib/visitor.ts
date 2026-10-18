"use client";

import { useSyncExternalStore } from "react";

const KEY = "visitor-name";
const SKIPPED = "skip";
const MAX_LENGTH = 12;

type Snapshot = { ready: boolean; name: string; skipped: boolean; editing: boolean };

const listeners = new Set<() => void>();
let editing = false;

const emit = () => listeners.forEach((l) => l());

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// useSyncExternalStore 需要穩定的快照：用字串當快照，再拆開
function getSnapshot(): string {
  const v = read();
  const state = v === null ? "none" : v === SKIPPED ? "skip" : `name:${v}`;
  return `${editing ? "edit" : "view"}|${state}`;
}

const getServerSnapshot = () => "server";

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useVisitor(): Snapshot {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (raw === "server") return { ready: false, name: "", skipped: false, editing: false };
  const cut = raw.indexOf("|");
  const mode = raw.slice(0, cut);
  const state = raw.slice(cut + 1);
  return {
    ready: true,
    editing: mode === "edit",
    skipped: state === "skip",
    name: state.startsWith("name:") ? state.slice(5) : "",
  };
}

export function saveName(input: string) {
  const name = input.trim().slice(0, MAX_LENGTH);
  try {
    localStorage.setItem(KEY, name || SKIPPED);
  } catch {}
  editing = false;
  emit();
}

export function skipName() {
  try {
    if (read() === null) localStorage.setItem(KEY, SKIPPED);
  } catch {}
  editing = false;
  emit();
}

export function startEditing() {
  editing = true;
  emit();
}

export { MAX_LENGTH };
