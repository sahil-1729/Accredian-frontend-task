import { NavLink, useLocation } from 'react-router-dom'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import AutoAwesomeMotionRoundedIcon from '@mui/icons-material/AutoAwesomeMotionRounded'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded'
import useAppStore from '../../store/useAppStore'

const navItems = [
  {
    label: 'Visual Editor',
    description: 'Canvas workspace',
    path: '/editor',
    icon: AutoAwesomeMotionRoundedIcon,
  },
  {
    label: 'Prompt Generator',
    description: 'LLM prompt lab',
    path: '/generator',
    icon: ArticleOutlinedIcon,
  },
]

const Sidebar = () => {
  const location = useLocation()
  const isSidebarOpen = useAppStore((state) => state.ui.isSidebarOpen)

  return (
    <Box
      component="nav"
      sx={{
        width: isSidebarOpen ? 264 : 0,
        transition: (theme) => theme.transitions.create('width', { duration: 220 }),
        overflow: 'hidden',
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ p: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
          <SpaceDashboardRoundedIcon fontSize="small" />
        </Avatar>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            visual editor
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            Product Shell
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const selected = location.pathname.startsWith(item.path)
          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              selected={selected}
              sx={{
                alignItems: 'flex-start',
                flexDirection: 'column',
                gap: 0.5,
                borderRadius: 3,
                my: 1,
                mx: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" width="100%">
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <Icon color={selected ? 'primary' : 'action'} />
                </ListItemIcon>
                <Box>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: selected ? 700 : 600 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </Stack>
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default Sidebar
