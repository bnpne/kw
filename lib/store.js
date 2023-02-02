import { create } from 'zustand'
import gsap from 'gsap'

const tl = gsap.timeline()

export const useCaseStore = create((set) => ({
  currentCard: 0,
  cardHeight: 0,
  cardWidth: 0,
  setCardHeight: (a) => set(() => ({ cardHeight: a })),
  setCardWidth: (a) => set(() => ({ cardWidth: a })),
  setCurrentCard: (a) => set(() => ({ currentCard: a })),
}))

export const useTimelineStore = create(() => ({
  timeline: tl,
}))
