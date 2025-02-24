import { invoke } from '@tauri-apps/api';

export interface LabResult {
  id: string;
  timestamp: string;
  type: 'CBC' | 'BloodGas' | 'Chemistry';
  values: Record<string, number | string>;
  flags?: Record<string, 'H' | 'L' | 'N'>;
  orderedBy: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Image {
  id: string;
  url: string;
  title: string;
  date: string;
  type: 'X-Ray' | 'Ultrasound' | 'CT' | 'MRI';
  description?: string;
  orderedBy: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export async function fetchLabResults(patientId: string): Promise<LabResult[]> {
  try {
    const results = await invoke('get_lab_results', { patientId });
    return results as LabResult[];
  } catch (error) {
    console.error('Error fetching lab results:', error);
    throw error;
  }
}

export async function createLabOrder(patientId: string, orderData: Partial<LabResult>) {
  try {
    const result = await invoke('create_lab_order', { patientId, orderData });
    return result;
  } catch (error) {
    console.error('Error creating lab order:', error);
    throw error;
  }
}

export async function fetchImages(patientId: string): Promise<Image[]> {
  try {
    const images = await invoke('get_images', { patientId });
    return images as Image[];
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export async function createImageOrder(patientId: string, orderData: Partial<Image>) {
  try {
    const result = await invoke('create_image_order', { patientId, orderData });
    return result;
  } catch (error) {
    console.error('Error creating image order:', error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: string, 
  type: 'lab' | 'image', 
  status: 'completed' | 'cancelled'
) {
  try {
    const command = type === 'lab' ? 'update_lab_status' : 'update_image_status';
    const result = await invoke(command, { orderId, status });
    return result;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}