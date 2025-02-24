import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Paper, Typography, Chip } from '@mui/material';

interface Intervention {
  id: string;
  type: 'ventilation' | 'medication' | 'procedure';
  timestamp: string;
  details: string;
  status: 'active' | 'completed' | 'discontinued';
}

// Custom node styles
const nodeStyles = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: 180,
};

const getNodeStyle = (type: string) => {
  switch (type) {
    case 'ventilation':
      return { background: '#e3f2fd' };
    case 'medication':
      return { background: '#f3e5f5' };
    case 'procedure':
      return { background: '#e8f5e9' };
    default:
      return { background: '#fff' };
  }
};

// Custom node component
const CustomNode = ({ data }: any) => {
  return (
    <Box sx={{ ...nodeStyles, ...getNodeStyle(data.type) }}>
      <Typography variant="subtitle2">{data.label}</Typography>
      <Typography variant="caption" display="block" color="text.secondary">
        {new Date(data.timestamp).toLocaleString()}
      </Typography>
      <Chip
        label={data.status}
        size="small"
        color={data.status === 'active' ? 'success' : 'default'}
        sx={{ mt: 1 }}
      />
    </Box>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

// Convert interventions to nodes and edges
const createTimelineElements = (interventions: Intervention[]) => {
  const sortedInterventions = [...interventions].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const nodes = sortedInterventions.map((intervention, index) => ({
    id: intervention.id,
    type: 'custom',
    position: { x: index * 250, y: getYPosition(intervention.type) },
    data: {
      label: intervention.details,
      type: intervention.type,
      timestamp: intervention.timestamp,
      status: intervention.status,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));

  const edges = sortedInterventions.slice(1).map((_, index) => ({
    id: `e${index}`,
    source: sortedInterventions[index].id,
    target: sortedInterventions[index + 1].id,
    type: 'smoothstep',
  }));

  return { nodes, edges };
};

// Helper function to position nodes by type
const getYPosition = (type: string) => {
  switch (type) {
    case 'ventilation':
      return 0;
    case 'medication':
      return 150;
    case 'procedure':
      return 300;
    default:
      return 0;
  }
};

// Mock data - replace with actual API calls
const mockInterventions: Intervention[] = [
  {
    id: '1',
    type: 'ventilation',
    timestamp: '2024-02-24T08:00:00',
    details: 'Started CPAP',
    status: 'active',
  },
  {
    id: '2',
    type: 'medication',
    timestamp: '2024-02-24T09:30:00',
    details: 'Surfactant administered',
    status: 'completed',
  },
  {
    id: '3',
    type: 'procedure',
    timestamp: '2024-02-24T10:45:00',
    details: 'Umbilical line insertion',
    status: 'completed',
  },
  {
    id: '4',
    type: 'ventilation',
    timestamp: '2024-02-24T12:00:00',
    details: 'Changed to HFNC',
    status: 'active',
  },
];

export default function InterventionTimeline() {
  const { nodes: initialNodes, edges: initialEdges } = createTimelineElements(mockInterventions);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <Box sx={{ width: '100%', height: '500px' }}>
      <Typography variant="h6" gutterBottom>Intervention Timeline</Typography>
      <Paper sx={{ height: '100%', p: 2 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </Paper>
    </Box>
  );
}