import PropTypes from 'prop-types'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import theme from '../theme.js'

const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  </ThemeProvider>
)

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppProviders
