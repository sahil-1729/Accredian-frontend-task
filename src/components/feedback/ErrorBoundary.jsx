import PropTypes from 'prop-types'
import { Component } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Application error boundary caught an error', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (typeof this.props.onReset === 'function') {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
          <Paper elevation={0} sx={{ p: 4, maxWidth: 420 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {this.state.error?.message || 'The workspace failed to render.'}
              </Typography>
              <Button variant="contained" onClick={this.handleReset}>
                Try again
              </Button>
            </Stack>
          </Paper>
        </Box>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  onReset: PropTypes.func,
}

export default ErrorBoundary
