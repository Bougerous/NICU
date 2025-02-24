import { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Paper, Typography } from '@mui/material';
import { Panel } from 'reactflow';

interface TimelineProps {
  interventions: Array<{
    id: string;
    type: string;
    timestamp: string;
    description: string;
  }>;
}

export default function InterventionTimeline({ interventions }: TimelineProps) {
  const initialNodes: Node[] = interventions.map((intervention, index) => ({
    id: intervention.id,
    type: 'default',
    data: { 
      label: (
        <Box>
          <Typography variant="subtitle2">{intervention.type}</Typography>
          <Typography variant="caption">
            {new Date(intervention.timestamp).toLocaleString()}
          </Typography>
          <Typography variant="body2">{intervention.description}</Typography>
        </Box>
      )
    },
    position: { x: index * 250, y: 100 },
  }));

  const initialEdges: Edge[] = interventions.slice(1).map((_, index) => ({
    id: `e${index}`,
    source: interventions[index].id,
    target: interventions[index + 1].id,
    type: 'smoothstep',
  }));

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, __, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => {
    console.log('Connection attempted:', params);
  }, []);

  return (
    <Paper sx={{ width: '100%', height: 400 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">
          <Typography variant="h6">Intervention Timeline</Typography>
        </Panel>
      </ReactFlow>
    </Paper>
  );
}