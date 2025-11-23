import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import useAppStore from '../../store/useAppStore'

const Topbar = () => {
  const toggleSidebar = useAppStore((state) => state.toggleSidebar)
  const setLoading = useAppStore((state) => state.setLoading)
  const resetWorkspace = useAppStore((state) => state.resetWorkspace)

  const handleGeneratorRun = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 800)
  }

  return (
    <AppBar
      color="inherit"
      position="static"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, py: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={toggleSidebar} edge="start" aria-label="Toggle navigation">
            <MenuRoundedIcon />
          </IconButton>
          <Box>
            <Typography variant="overline" color="text.secondary">
              workspace overview
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              Visual Editor Shell
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="text"
            color="inherit"
            startIcon={<RefreshRoundedIcon />}
            onClick={resetWorkspace}
          >
            Reset session
          </Button>
          <Button
            variant="contained"
            size="medium"
            startIcon={<PlayArrowRoundedIcon />}
            onClick={handleGeneratorRun}
          >
            Run generator
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
