import { create } from 'zustand'

const initialVisualEditor = {
  nodes: [],
  selectedNodeId: null,
  clipboard: null,
}

const initialPromptGenerator = {
  history: [],
  activePrompt: '',
  lastRunAt: null,
}

const initialUi = {
  isSidebarOpen: true,
  isLoading: false,
  error: null,
}

const useAppStore = create((set) => ({
  visualEditor: { ...initialVisualEditor },
  promptGenerator: { ...initialPromptGenerator },
  ui: { ...initialUi },
  setVisualEditor: (next) =>
    set((state) => ({
      visualEditor: { ...state.visualEditor, ...next },
    })),
  setPromptGenerator: (next) =>
    set((state) => ({
      promptGenerator: { ...state.promptGenerator, ...next },
    })),
  toggleSidebar: () =>
    set((state) => ({
      ui: { ...state.ui, isSidebarOpen: !state.ui.isSidebarOpen },
    })),
  setLoading: (isLoading) =>
    set((state) => ({
      ui: { ...state.ui, isLoading },
    })),
  setError: (error) =>
    set((state) => ({
      ui: { ...state.ui, error },
    })),
  resetWorkspace: () =>
    set({
      visualEditor: { ...initialVisualEditor },
      promptGenerator: { ...initialPromptGenerator },
      ui: { ...initialUi },
    }),
}))

export default useAppStore
