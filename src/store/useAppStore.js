import { create } from 'zustand'
import sampleNodes from '../features/visual-editor/data/sampleNodes'
import { cloneVisualNodes } from '../features/visual-editor/utils/schemaUtils'

const createVisualSnapshot = (visualEditor) => ({
  nodes: cloneVisualNodes(visualEditor.nodes),
  selectedNodeId: visualEditor.selectedNodeId,
})

const initialVisualEditor = {
  nodes: cloneVisualNodes(sampleNodes),
  selectedNodeId: sampleNodes[0]?.id || null,
  hoveredNodeId: null,
  clipboard: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
  history: [],
  future: [],
  isDirty: false,
  lastSavedAt: null,
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

const clampZoom = (value) => Math.min(1.75, Math.max(0.4, value))

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
  selectVisualNode: (nodeId) =>
    set((state) => ({
      visualEditor: { ...state.visualEditor, selectedNodeId: nodeId },
    })),
  hoverVisualNode: (nodeId) =>
    set((state) => ({
      visualEditor: { ...state.visualEditor, hoveredNodeId: nodeId },
    })),
  updateVisualNodeProps: (nodeId, patch) =>
    set((state) => {
      const { visualEditor } = state
      const index = visualEditor.nodes.findIndex((node) => node.id === nodeId)
      if (index === -1) return {}

      const snapshot = createVisualSnapshot(visualEditor)
      const node = visualEditor.nodes[index]
      const currentProps = { ...(node.props || {}) }
      const resolvedPatch = typeof patch === 'function' ? patch(currentProps) : patch

      if (!resolvedPatch || typeof resolvedPatch !== 'object') {
        return {}
      }

      const nextNodes = visualEditor.nodes.map((existingNode, idx) =>
        idx === index
          ? {
              ...existingNode,
              props: { ...currentProps, ...resolvedPatch },
            }
          : existingNode,
      )

      return {
        visualEditor: {
          ...visualEditor,
          nodes: nextNodes,
          history: [...visualEditor.history, snapshot],
          future: [],
          isDirty: true,
        },
      }
    }),
  updateVisualNodeMeta: (nodeId, patch) =>
    set((state) => {
      const { visualEditor } = state
      const index = visualEditor.nodes.findIndex((node) => node.id === nodeId)
      if (index === -1 || !patch) return {}

      const snapshot = createVisualSnapshot(visualEditor)
      const nextNodes = visualEditor.nodes.map((existingNode, idx) =>
        idx === index
          ? {
              ...existingNode,
              ...patch,
            }
          : existingNode,
      )

      return {
        visualEditor: {
          ...visualEditor,
          nodes: nextNodes,
          history: [...visualEditor.history, snapshot],
          future: [],
          isDirty: true,
        },
      }
    }),
  appendVisualNodes: (nodes = []) =>
    set((state) => {
      if (!nodes.length) return {}
      const { visualEditor } = state
      const snapshot = createVisualSnapshot(visualEditor)
      const nextNodes = [...visualEditor.nodes, ...cloneVisualNodes(nodes)]

      return {
        visualEditor: {
          ...visualEditor,
          nodes: nextNodes,
          selectedNodeId: nodes[0]?.id || visualEditor.selectedNodeId,
          history: [...visualEditor.history, snapshot],
          future: [],
          isDirty: true,
        },
      }
    }),
  setCanvasZoom: (zoom) =>
    set((state) => ({
      visualEditor: { ...state.visualEditor, zoom: clampZoom(zoom) },
    })),
  setCanvasPan: (pan) =>
    set((state) => ({
      visualEditor: { ...state.visualEditor, pan },
    })),
  nudgeCanvasPan: (dx, dy) =>
    set((state) => ({
      visualEditor: {
        ...state.visualEditor,
        pan: {
          x: state.visualEditor.pan.x + dx,
          y: state.visualEditor.pan.y + dy,
        },
      },
    })),
  undoVisualEditor: () =>
    set((state) => {
      const { visualEditor } = state
      if (!visualEditor.history.length) return {}

      const previous = visualEditor.history[visualEditor.history.length - 1]
      const nextHistory = visualEditor.history.slice(0, -1)
      const snapshot = createVisualSnapshot(visualEditor)

      return {
        visualEditor: {
          ...visualEditor,
          nodes: previous.nodes,
          selectedNodeId: previous.selectedNodeId,
          history: nextHistory,
          future: [snapshot, ...visualEditor.future],
          isDirty: true,
        },
      }
    }),
  redoVisualEditor: () =>
    set((state) => {
      const { visualEditor } = state
      if (!visualEditor.future.length) return {}

      const nextState = visualEditor.future[0]
      const nextFuture = visualEditor.future.slice(1)
      const snapshot = createVisualSnapshot(visualEditor)

      return {
        visualEditor: {
          ...visualEditor,
          nodes: nextState.nodes,
          selectedNodeId: nextState.selectedNodeId,
          history: [...visualEditor.history, snapshot],
          future: nextFuture,
          isDirty: true,
        },
      }
    }),
  markVisualEditorSaved: () =>
    set((state) => ({
      visualEditor: {
        ...state.visualEditor,
        isDirty: false,
        lastSavedAt: new Date().toISOString(),
      },
    })),
  resetWorkspace: () =>
    set({
      visualEditor: { ...initialVisualEditor, nodes: cloneVisualNodes(sampleNodes) },
      promptGenerator: { ...initialPromptGenerator },
      ui: { ...initialUi },
    }),
}))

export default useAppStore
