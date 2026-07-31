import { useEffect, useState } from 'react';
import { logger } from '@utils/logger';
import { mockNotes } from './data.mock';
import { DEFAULT_FOLDER, type Note } from './types';

const STORAGE_KEY = 'red_king.notes.v1';

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockNotes;
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockNotes;
  } catch (error) {
    logger.warn('Failed to read notes from Local Storage — falling back to mock data', { error }, 'notes');
    return mockNotes;
  }
}

function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    logger.error('Failed to persist notes to Local Storage', error, 'notes');
  }
}

function createEmptyNote(): Note {
  const now = new Date().toISOString();
  return {
    id: `note-${Date.now()}`,
    title: 'Untitled Note',
    content: '',
    folder: DEFAULT_FOLDER,
    tags: [],
    pinned: false,
    favorite: false,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Notes بالكامل:
 * تحميل + حفظ تلقائي في Local Storage + عمليات الـ CRUD.
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNotes(loadNotes());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveNotes(notes);
  }, [notes, isLoading]);

  const createNote = (): Note => {
    const note = createEmptyNote();
    setNotes((prev) => [note, ...prev]);
    return note;
  };

  const updateNote = (id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>): void => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n))
    );
  };

  const deleteNote = (id: string): void => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const togglePin = (id: string): void => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() } : n))
    );
  };

  const toggleFavorite = (id: string): void => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() } : n))
    );
  };

  return { notes, isLoading, createNote, updateNote, deleteNote, togglePin, toggleFavorite };
}
