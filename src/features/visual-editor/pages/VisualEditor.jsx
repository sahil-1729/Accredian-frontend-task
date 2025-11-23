import { useCallback, useMemo } from 'react'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded'
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import RedoRoundedIcon from '@mui/icons-material/RedoRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import NorthRoundedIcon from '@mui/icons-material/NorthRounded'
import SouthRoundedIcon from '@mui/icons-material/SouthRounded'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import WestRoundedIcon from '@mui/icons-material/WestRounded'
import useAppStore from '../../../store/useAppStore'
import CanvasWorkspace from '../components/CanvasWorkspace'
import ComponentTreePanel from '../components/ComponentTreePanel'
import PropertiesPanel from '../components/PropertiesPanel'
import CodePreviewPanel from '../components/CodePreviewPanel'
import { buildNodeMap, buildNodeTree, generateJSXForNode, getNodeAncestors } from '../utils/schemaUtils'

const VisualEditor = () => {
  const {
    visualEditor,
    selectVisualNode,
    hoverVisualNode,
    updateVisualNodeProps,
    updateVisualNodeMeta,
    setCanvasZoom,
    nudgeCanvasPan,
    setCanvasPan,
    undoVisualEditor,
    redoVisualEditor,
    markVisualEditorSaved,
    setToast,
  } = useAppStore((state) => ({
    visualEditor: state.visualEditor,
    selectVisualNode: state.selectVisualNode,
    hoverVisualNode: state.hoverVisualNode,
    updateVisualNodeProps: state.updateVisualNodeProps,
    updateVisualNodeMeta: state.updateVisualNodeMeta,
    setCanvasZoom: state.setCanvasZoom,
    nudgeCanvasPan: state.nudgeCanvasPan,
    setCanvasPan: state.setCanvasPan,
    undoVisualEditor: state.undoVisualEditor,
    redoVisualEditor: state.redoVisualEditor,
    markVisualEditorSaved: state.markVisualEditorSaved,
    setToast: state.setToast,
  }))

  const nodesMap = useMemo(() => buildNodeMap(visualEditor.nodes), [visualEditor.nodes])
  const tree = useMemo(() => buildNodeTree(visualEditor.nodes), [visualEditor.nodes])
  const breadcrumbs = useMemo(
    () => getNodeAncestors(visualEditor.selectedNodeId, nodesMap),
    [visualEditor.selectedNodeId, nodesMap],
  )
  const codePreview = useMemo(
    () => generateJSXForNode(visualEditor.selectedNodeId, nodesMap),
    [visualEditor.selectedNodeId, nodesMap],
  )
  const selectedNode = visualEditor.selectedNodeId ? nodesMap.get(visualEditor.selectedNodeId) : null

  const handlePropUpdate = useCallback(
    (incoming) => {
      if (!visualEditor.selectedNodeId) return
      updateVisualNodeProps(visualEditor.selectedNodeId, incoming)
    },
    [visualEditor.selectedNodeId, updateVisualNodeProps],
  )

  const handleMetaUpdate = useCallback(
    (incoming) => {
      if (!visualEditor.selectedNodeId) return
      updateVisualNodeMeta(visualEditor.selectedNodeId, incoming)
    },
    [visualEditor.selectedNodeId, updateVisualNodeMeta],
  )

  const handleZoomIn = () => setCanvasZoom(visualEditor.zoom + 0.1)
  const handleZoomOut = () => setCanvasZoom(visualEditor.zoom - 0.1)
  const handleResetView = () => {
    setCanvasZoom(1)
    setCanvasPan({ x: 0, y: 0 })
  }
  const handlePan = (dx, dy) => nudgeCanvasPan(dx, dy)

  const handleSave = () => {
    markVisualEditorSaved()
    setToast('Workspace snapshot saved', 'success')
  }

  const insightTiles = [
    { label: 'Layers', value: visualEditor.nodes.length },
    { label: 'Zoom', value: `${Math.round(visualEditor.zoom * 100)}%` },
    { label: 'History', value: `${visualEditor.history.length} undo` },
  ]

  const lastSavedLabel = visualEditor.lastSavedAt
    ? new Date(visualEditor.lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Not saved yet'

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between">
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Visual Editor
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={640}>
            Inspect, select, and evolve generated components with live preview, breadcrumbs, and a
            synchronized JSX view.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Tooltip title="Undo">
            <span>
              <IconButton
                color="primary"
                onClick={undoVisualEditor}
                disabled={!visualEditor.history.length}
              >
                <UndoRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo">
            <span>
              <IconButton
                color="primary"
                onClick={redoVisualEditor}
                disabled={!visualEditor.future.length}
              >
                <RedoRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSave}
            disabled={!visualEditor.isDirty}
          >
            Save snapshot
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      {insightTiles.map((insight) => (
                        <Box key={insight.label}>
                          <Typography variant="overline" color="text.secondary">
                            {insight.label}
                          </Typography>
                          <Typography variant="h6">{insight.value}</Typography>
                        </Box>
                      ))}
                    </Stack>
                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Last saved
                      </Typography>
                      <Typography variant="body2">{lastSavedLabel}</Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Hierarchy
                    </Typography>
                    <Breadcrumbs separator="›" maxItems={4} sx={{ fontSize: '0.875rem' }}>
                      {breadcrumbs.length === 0 && (
                        <Typography color="text.secondary">Canvas</Typography>
                      )}
                      {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1
                        return (
                          <Typography
                            key={item.id}
                            color={isLast ? 'text.primary' : 'text.secondary'}
                            sx={{
                              cursor: isLast ? 'default' : 'pointer',
                              textTransform: 'capitalize',
                            }}
                            onClick={() => !isLast && selectVisualNode(item.id)}
                          >
                            {item.label || item.type}
                          </Typography>
                        )
                      })}
                    </Breadcrumbs>
                  </Stack>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Zoom out">
                        <span>
                          <IconButton onClick={handleZoomOut}>
                            <ZoomOutRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Chip label={`${Math.round(visualEditor.zoom * 100)}%`} variant="outlined" />
                      <Tooltip title="Zoom in">
                        <span>
                          <IconButton onClick={handleZoomIn}>
                            <ZoomInRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Reset view">
                        <span>
                          <IconButton onClick={handleResetView}>
                            <CenterFocusWeakRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Pan up">
                        <span>
                          <IconButton onClick={() => handlePan(0, -24)}>
                            <NorthRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Pan down">
                        <span>
                          <IconButton onClick={() => handlePan(0, 24)}>
                            <SouthRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Pan left">
                        <span>
                          <IconButton onClick={() => handlePan(-24, 0)}>
                            <WestRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Pan right">
                        <span>
                          <IconButton onClick={() => handlePan(24, 0)}>
                            <EastRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <ComponentTreePanel
                      tree={tree}
                      selectedNodeId={visualEditor.selectedNodeId}
                      onSelectNode={selectVisualNode}
                    />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <CanvasWorkspace
                      tree={tree}
                      nodes={visualEditor.nodes}
                      selectedNodeId={visualEditor.selectedNodeId}
                      hoveredNodeId={visualEditor.hoveredNodeId}
                      zoom={visualEditor.zoom}
                      pan={visualEditor.pan}
                      onSelectNode={selectVisualNode}
                      onHoverNode={hoverVisualNode}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <CodePreviewPanel code={codePreview} breadcrumbs={breadcrumbs} />
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <PropertiesPanel
            node={selectedNode}
            onUpdateProps={handlePropUpdate}
            onUpdateMeta={handleMetaUpdate}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default VisualEditor
