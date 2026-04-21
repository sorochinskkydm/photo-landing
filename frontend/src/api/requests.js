import { apiClient } from './client';

export const REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export async function createRequest(payload) {
  const { data } = await apiClient.post('/requests', payload);
  return data;
}

export async function fetchRequests() {
  const { data } = await apiClient.get('/requests');
  return data;
}

export async function updateRequestStatus(id, status) {
  const { data } = await apiClient.patch(`/requests/${id}/status`, { status });
  return data;
}
