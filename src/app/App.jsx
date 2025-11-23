import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import LoadingState from '../components/feedback/LoadingState.jsx'

const VisualEditorPage = lazy(() => import('../features/visual-editor/pages/VisualEditor.jsx'))
const PromptGeneratorPage = lazy(() => import('../features/prompt-generator/pages/PromptGenerator.jsx'))
const NotFoundPage = lazy(() => import('../features/misc/pages/NotFound.jsx'))

const App = () => (
  <Suspense fallback={<LoadingState message="Booting the workspace..." />}>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/editor" replace />} />
        <Route path="/editor" element={<VisualEditorPage />} />
        <Route path="/generator" element={<PromptGeneratorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
)

export default App
