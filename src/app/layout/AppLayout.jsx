import { Outlet } from 'react-router-dom'
import { Box, Fade } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Sidebar from '../../components/navigation/Sidebar.jsx'
import Topbar from '../../components/navigation/Topbar.jsx'
import LoadingState from '../../components/feedback/LoadingState.jsx'
import ErrorBoundary from '../../components/feedback/ErrorBoundary.jsx'
import useAppStore from '../../store/useAppStore'

const AppLayout = () => {
  const theme = useTheme()
  const { isLoading } = useAppStore((state) => ({ isLoading: state.ui.isLoading }))

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar />
      <Box component="section" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Topbar />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, lg: 4 } }}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
        <Fade in={isLoading} timeout={{ enter: 200, exit: 200 }} unmountOnExit>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(3px)',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(18,18,18,0.7)' : 'rgba(255,255,255,0.7)',
              zIndex: 10,
            }}
          >
            <LoadingState message="Syncing workspace context..." />
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}

export default AppLayout
