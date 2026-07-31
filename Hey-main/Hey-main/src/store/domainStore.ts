import { create } from 'zustand';

/**
 * Domain state — بيانات حقيقية للعمل (مش UI).
 * لسه فاضي عمدًا؛ هيتملى مع كل Feature (Sprint 4+).
 */
interface DomainState {
  activeInvestigationId: string | null;
  setActiveInvestigation: (id: string | null) => void;

  activeNoteId: string | null;
  setActiveNote: (id: string | null) => void;
}

export const useDomainStore = create<DomainState>((set) => ({
  activeInvestigationId: null,
  setActiveInvestigation: (id) => set({ activeInvestigationId: id }),

  activeNoteId: null,
  setActiveNote: (id) => set({ activeNoteId: id }),
}));
