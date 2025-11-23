import { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'

const alignValue = (value, fallback = 'flex-start') => {
  if (!value) return fallback
  if (value === 'start') return 'flex-start'
  if (value === 'end') return 'flex-end'
  return value
}

const RenderMetric = ({ label, value, suffix, trend }) => (
  <Stack
    spacing={0.5}
    sx={{
      px: 2,
      py: 1.5,
      borderRadius: 2,
      backgroundColor: 'rgba(248, 250, 252, 0.08)',
      minWidth: 140,
    }}
  >
    <Typography variant="overline" sx={{ color: 'rgba(248, 250, 252, 0.72)' }}>
      {label || 'Metric'}
    </Typography>
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant="h4">{value || '000'}</Typography>
      {suffix && (
        <Typography variant="subtitle2" sx={{ color: 'rgba(248, 250, 252, 0.72)' }}>
          {suffix}
        </Typography>
      )}
    </Stack>
    <Typography variant="caption" sx={{ color: trend?.startsWith('-') ? '#f08375' : '#4ade80' }}>
      {trend || '+0%'}
    </Typography>
  </Stack>
)

RenderMetric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  suffix: PropTypes.string,
  trend: PropTypes.string,
}

RenderMetric.defaultProps = {
  label: '',
  value: '',
  suffix: '',
  trend: '',
}

const renderNodeContent = (node, children) => {
  const props = node.props || {}

  switch (node.type) {
    case 'artboard':
      return (
        <Stack
          spacing={props.gap ?? 4}
          sx={{
            width: '100%',
            maxWidth: props.maxWidth || 1100,
            margin: '0 auto',
            padding: `${props.padding ?? 40}px`,
            backgroundColor: props.background || '#ffffff',
            borderRadius: `${props.radius ?? 32}px`,
            boxShadow: '0 30px 80px rgba(15, 23, 42, 0.08)',
          }}
        >
          {children}
        </Stack>
      )
    case 'section':
    case 'stack':
      return (
        <Stack
          direction={props.direction || 'column'}
          spacing={props.gap ?? 2}
          alignItems={alignValue(props.align, 'flex-start')}
          justifyContent={alignValue(props.justify, 'flex-start')}
          sx={{
            width: props.width ? `${props.width}px` : '100%',
            maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
            padding: `${props.padding ?? (node.type === 'section' ? 32 : 16)}px`,
            borderRadius: `${props.radius ?? (node.type === 'section' ? 28 : 16)}px`,
            backgroundColor: props.background || 'transparent',
            color: props.color || 'inherit',
            minHeight: props.height ? `${props.height}px` : 'auto',
          }}
        >
          {children}
        </Stack>
      )
    case 'card':
      return (
        <Paper
          elevation={props.background ? 0 : 3}
          sx={{
            width: props.width ? `${props.width}px` : '100%',
            maxWidth: props.maxWidth ? `${props.maxWidth}px` : '100%',
            padding: `${props.padding ?? 24}px`,
            borderRadius: `${props.radius ?? 18}px`,
            backgroundColor: props.background || 'rgba(255,255,255,0.9)',
            color: props.color || 'inherit',
            display: 'flex',
            flexDirection: props.direction || 'column',
            gap: (props.gap ?? 2) * 8,
            justifyContent: alignValue(props.justify, 'flex-start'),
            alignItems: alignValue(props.align, 'flex-start'),
            minHeight: props.height ? `${props.height}px` : 'auto',
          }}
        >
          {children}
        </Paper>
      )
    case 'text':
      return (
        <Typography
          variant={props.variant || 'body1'}
          color={props.color || 'text.primary'}
          sx={{
            fontWeight: props.fontWeight || 'inherit',
            letterSpacing: props.letterSpacing ? `${props.letterSpacing}px` : undefined,
            textTransform: props.textTransform,
            lineHeight: props.lineHeight || 'inherit',
          }}
        >
          {props.text || 'Text'}
        </Typography>
      )
    case 'button':
      return (
        <Button
          variant={props.variant || 'contained'}
          size={props.size || 'medium'}
          color={props.variant === 'outlined' ? 'inherit' : 'primary'}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {props.text || 'Action'}
        </Button>
      )
    case 'image':
      return (
        <Box
          component="img"
          src={props.src || 'https://placehold.co/600x400'}
          alt={props.alt || 'Image'}
          sx={{
            width: '100%',
            borderRadius: `${props.radius ?? 12}px`,
            objectFit: 'cover',
            boxShadow: '0 10px 35px rgba(15,23,42,0.25)',
          }}
        />
      )
    case 'metric':
      return <RenderMetric {...props} />
    default:
      return <Stack spacing={props.gap ?? 2}>{children}</Stack>
  }
}

const NodeRenderer = ({ node, selectedNodeId, hoveredNodeId, onSelectNode, onHoverNode }) => {
  const theme = useTheme()
  const isSelected = node.id === selectedNodeId
  const isHovered = node.id === hoveredNodeId

  const handleClick = (event) => {
    event.stopPropagation()
    onSelectNode(node.id)
  }

  const handleMouseEnter = (event) => {
    event.stopPropagation()
    onHoverNode(node.id)
  }

  const handleMouseLeave = (event) => {
    event.stopPropagation()
    onHoverNode(null)
  }

  const children = (node.children || []).map((child) => (
    <NodeRenderer
      key={child.id}
      node={child}
      selectedNodeId={selectedNodeId}
      hoveredNodeId={hoveredNodeId}
      onSelectNode={onSelectNode}
      onHoverNode={onHoverNode}
    />
  ))

  return (
    <Box
      data-node-id={node.id}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        outline: isSelected
          ? `2px solid ${theme.palette.primary.main}`
          : isHovered
            ? `1px dashed ${alpha(theme.palette.primary.main, 0.7)}`
            : 'none',
        outlineOffset: 3,
        borderRadius: `${node.props?.radius ?? 12}px`,
        transition: 'outline 0.12s ease',
        cursor: 'pointer',
      }}
    >
      {renderNodeContent(node, children)}
    </Box>
  )
}

NodeRenderer.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    props: PropTypes.object,
    children: PropTypes.array,
  }).isRequired,
  selectedNodeId: PropTypes.string,
  hoveredNodeId: PropTypes.string,
  onSelectNode: PropTypes.func.isRequired,
  onHoverNode: PropTypes.func.isRequired,
}

const SelectionOverlay = ({ box }) => {
  const theme = useTheme()
  const color = theme.palette.primary.main

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: box.y,
          left: box.x,
          width: box.width,
          height: box.height,
          border: `2px solid ${color}`,
          borderRadius: '16px',
          pointerEvents: 'none',
          boxShadow: `0 0 0 8px ${alpha(color, 0.08)}`,
        }}
      >
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => {
          const [posY, posX] = position.split('-')
          return (
            <Box
              key={position}
              sx={{
                position: 'absolute',
                [posY]: -6,
                [posX]: -6,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: color,
                border: '2px solid #fff',
              }}
            />
          )
        })}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: box.y + box.height / 2,
          left: 0,
          right: 0,
          borderTop: `1px dashed ${alpha(color, 0.4)}`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: box.x + box.width / 2,
          top: 0,
          bottom: 0,
          borderLeft: `1px dashed ${alpha(color, 0.4)}`,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

SelectionOverlay.propTypes = {
  box: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

const EmptyState = () => (
  <Stack spacing={1.5} alignItems="center" py={8}>
    <Chip label="Canvas" color="primary" variant="outlined" />
    <Typography variant="body1" color="text.secondary" align="center" maxWidth={360}>
      Load a schema from the Prompt Generator to begin orchestrating components in the canvas.
    </Typography>
  </Stack>
)

const CanvasWorkspace = ({
  tree,
  nodes,
  selectedNodeId,
  hoveredNodeId,
  zoom,
  pan,
  onSelectNode,
  onHoverNode,
}) => {
  const canvasRef = useRef(null)
  const [selectionBox, setSelectionBox] = useState(null)

  useLayoutEffect(() => {
    const updateOverlay = () => {
      if (!canvasRef.current || !selectedNodeId) {
        setSelectionBox(null)
        return
      }

      const target = canvasRef.current.querySelector(`[data-node-id="${selectedNodeId}"]`)
      if (!target) {
        setSelectionBox(null)
        return
      }

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()

      setSelectionBox({
        x: targetRect.left - canvasRect.left,
        y: targetRect.top - canvasRect.top,
        width: targetRect.width,
        height: targetRect.height,
      })
    }

    updateOverlay()
    window.addEventListener('resize', updateOverlay)
    return () => {
      window.removeEventListener('resize', updateOverlay)
    }
  }, [selectedNodeId, nodes, zoom, pan])

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        minHeight: 520,
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.12) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }}
    >
      <Box
        ref={canvasRef}
        onClick={() => onSelectNode(null)}
        onMouseLeave={() => onHoverNode(null)}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        <Box
          sx={{
            width: '100%',
            minHeight: 520,
            transform: `translate(${pan.x}px, ${pan.y}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <Box
            sx={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s ease-out',
              py: 6,
              px: { xs: 2, sm: 4 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 1280 }}>
              {tree.length === 0 ? (
                <EmptyState />
              ) : (
                tree.map((node) => (
                  <NodeRenderer
                    key={node.id}
                    node={node}
                    selectedNodeId={selectedNodeId}
                    hoveredNodeId={hoveredNodeId}
                    onSelectNode={onSelectNode}
                    onHoverNode={onHoverNode}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
        {selectionBox && <SelectionOverlay box={selectionBox} />}
      </Box>
    </Box>
  )
}

CanvasWorkspace.propTypes = {
  tree: PropTypes.arrayOf(PropTypes.object),
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedNodeId: PropTypes.string,
  hoveredNodeId: PropTypes.string,
  zoom: PropTypes.number.isRequired,
  pan: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }).isRequired,
  onSelectNode: PropTypes.func.isRequired,
  onHoverNode: PropTypes.func.isRequired,
}

CanvasWorkspace.defaultProps = {
  tree: [],
  selectedNodeId: null,
  hoveredNodeId: null,
}

export default CanvasWorkspace
