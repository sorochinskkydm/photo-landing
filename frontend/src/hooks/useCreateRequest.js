import { useState } from 'react';
import { createRequest } from '../api/requests';

export function useCreateRequest() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function submit(payload) {
    setStatus('loading');
    setError(null);
    try {
      const result = await createRequest(payload);
      setStatus('success');
      return result;
    } catch (err) {
      const message =
        err?.response?.data?.message ?? 'Не удалось отправить заявку';
      setError(Array.isArray(message) ? message.join(', ') : message);
      setStatus('error');
      throw err;
    }
  }

  function reset() {
    setStatus('idle');
    setError(null);
  }

  return { submit, reset, status, error };
}
