import { useCallback, useEffect, useState } from 'react';
import { fetchRequests } from '../api/requests';

export function useRequests() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await fetchRequests();
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Не удалось загрузить заявки');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, error, refetch: load, setData };
}
