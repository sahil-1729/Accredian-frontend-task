import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import { Box, Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

const CodePreviewPanel = ({ code, breadcrumbs }) => {
  const [copied, setCopied] = useState(false)

  const hierarchyLabel = useMemo(() => {
    if (!breadcrumbs.length) return 'No selection'
    return breadcrumbs.map((node) => node.label || node.type).join(' / ')
  }, [breadcrumbs])

  const handleCopy = async () => {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (error) {
      console.error('Clipboard error', error)
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              JSX preview
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {hierarchyLabel}
            </Typography>
          </Box>
          <Tooltip title={copied ? 'Copied' : 'Copy code'}>
            <span>
              <IconButton color={copied ? 'success' : 'default'} onClick={handleCopy} disabled={!code}>
                {copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            p: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            overflowX: 'auto',
            fontFamily: 'JetBrains Mono, SFMono-Regular, Menlo, monospace',
            fontSize: '0.85rem',
            lineHeight: 1.5,
            whiteSpace: 'pre',
            minHeight: 220,
          }}
        >
          {code || '// Select a layer to preview its JSX'}
        </Box>
      </CardContent>
    </Card>
  )
}

CodePreviewPanel.propTypes = {
  code: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
}

CodePreviewPanel.defaultProps = {
  code: '',
  breadcrumbs: [],
}

export default CodePreviewPanel
