import { invoke } from '@tauri-apps/api';

export interface Intervention {
  id: string;
  type: 'ventilation' | 'medication' | 'procedure';
  timestamp: string;
  details: string;
  status: 'active' | 'completed' | 'discontinued';
  category?: string;
  orderedBy: string;
  notes?: string;
  duration?: number;
  parameters?: Record<string, any>;
}

export interface InterventionFilter {
  startDate?: string;
  endDate?: string;
  type?: string[];
  status?: string[];
}

export async function fetchInterventions(
  patientId: string, 
  filters?: InterventionFilter
): Promise<Intervention[]> {
  try {
    const interventions = await invoke('get_interventions', { 
      patientId,
      filters 
    });
    return interventions as Intervention[];
  } catch (error) {
    console.error('Error fetching interventions:', error);
    throw error;
  }
}

export async function createIntervention(
  patientId: string, 
  interventionData: Omit<Intervention, 'id'>
): Promise<Intervention> {
  try {
    const intervention = await invoke('create_intervention', {
      patientId,
      interventionData
    });
    return intervention as Intervention;
  } catch (error) {
    console.error('Error creating intervention:', error);
    throw error;
  }
}

export async function updateInterventionStatus(
  interventionId: string,
  status: 'active' | 'completed' | 'discontinued',
  notes?: string
): Promise<void> {
  try {
    await invoke('update_intervention_status', {
      interventionId,
      status,
      notes
    });
  } catch (error) {
    console.error('Error updating intervention status:', error);
    throw error;
  }
}

export async function getInterventionTimeline(
  patientId: string,
  timeRange: { start: string; end: string }
): Promise<Intervention[]> {
  try {
    const timeline = await invoke('get_intervention_timeline', {
      patientId,
      timeRange
    });
    return timeline as Intervention[];
  } catch (error) {
    console.error('Error fetching intervention timeline:', error);
    throw error;
  }
}

export async function getInterventionStats(
  patientId: string,
  timeRange?: { start: string; end: string }
): Promise<{
  totalCount: number;
  typeDistribution: Record<string, number>;
  averageDuration: number;
}> {
  try {
    const stats = await invoke('get_intervention_stats', {
      patientId,
      timeRange
    });
    return stats as any;
  } catch (error) {
    console.error('Error fetching intervention statistics:', error);
    throw error;
  }
}