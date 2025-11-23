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
  generatedSchema: null,
  generationStatus: 'idle',
  generationError: null,
  parameters: {
    layout: 'grid',
    fidelity: 'high',
  },
}

const initialUi = {
  isSidebarOpen: true,
  isLoading: false,
  error: null,
  toastMessage: null,
  toastSeverity: 'info',
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
  setUi: (next) =>
    set((state) => ({
      ui: { ...state.ui, ...next },
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
  setToast: (message, severity = 'info') =>
    set((state) => ({
      ui: { ...state.ui, toastMessage: message, toastSeverity: severity },
    })),
  clearToast: () =>
    set((state) => ({
      ui: { ...state.ui, toastMessage: null, toastSeverity: 'info' },
    })),
  resetWorkspace: () =>
    set({
      visualEditor: { ...initialVisualEditor },
      promptGenerator: { ...initialPromptGenerator },
      ui: { ...initialUi },
    }),
}))

export default useAppStore
