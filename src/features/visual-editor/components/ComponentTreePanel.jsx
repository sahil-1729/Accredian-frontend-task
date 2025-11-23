import PropTypes from 'prop-types'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Chip, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'

const TreeItem = ({ node, level, selectedNodeId, onSelect }) => {
  const theme = useTheme()
  const isSelected = node.id === selectedNodeId

  return (
    <Box>
      <ListItemButton
        onClick={() => onSelect(node.id)}
        selected={isSelected}
        sx={{
          pl: 1.5 + level * 2,
          borderRadius: 1,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
        }}
      >
        <ListItemText
          primary={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {node.label || node.type}
              </Typography>
              <Chip label={node.type} size="small" variant="outlined" />
            </Stack>
          }
          secondary={node.id}
          primaryTypographyProps={{ noWrap: true }}
          secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary', noWrap: true }}
        />
      </ListItemButton>
      {(node.children || []).map((child) => (
        <TreeItem
          key={child.id}
          node={child}
          level={level + 1}
          selectedNodeId={selectedNodeId}
          onSelect={onSelect}
        />
      ))}
    </Box>
  )
}

TreeItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.array,
  }).isRequired,
  level: PropTypes.number.isRequired,
  selectedNodeId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
}

const ComponentTreePanel = ({ tree, selectedNodeId, onSelectNode }) => (
  <Stack spacing={2} sx={{ height: '100%' }}>
    <Stack direction="row" spacing={1} alignItems="center">
      <LayersOutlinedIcon fontSize="small" color="primary" />
      <Typography variant="subtitle2" color="text.secondary">
        Layer tree
      </Typography>
    </Stack>
    {tree.length === 0 ? (
      <Box sx={{ py: 6 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Load a schema to inspect components
        </Typography>
      </Box>
    ) : (
      <List disablePadding>
        {tree.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            level={0}
            selectedNodeId={selectedNodeId}
            onSelect={onSelectNode}
          />
        ))}
      </List>
    )}
  </Stack>
)

ComponentTreePanel.propTypes = {
  tree: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedNodeId: PropTypes.string,
  onSelectNode: PropTypes.func.isRequired,
}

export default ComponentTreePanel
