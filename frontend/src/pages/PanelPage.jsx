import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import RequestList from '../components/RequestList/RequestList';
import { useRequests } from '../hooks/useRequests';
import { REQUEST_STATUS, updateRequestStatus } from '../api/requests';
import './PanelPage.css';

const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: REQUEST_STATUS.PENDING, label: 'Новые' },
  { value: REQUEST_STATUS.APPROVED, label: 'Одобренные' },
  { value: REQUEST_STATUS.REJECTED, label: 'Отклонённые' },
];

export default function PanelPage() {
  const { data, status, error, refetch, setData } = useRequests();
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return data;
    return data.filter((r) => r.status === filter);
  }, [data, filter]);

  const counts = useMemo(
    () => ({
      total: data.length,
      pending: data.filter((r) => r.status === REQUEST_STATUS.PENDING).length,
    }),
    [data],
  );

  async function handleStatusChange(id, nextStatus) {
    setBusyId(id);
    try {
      const updated = await updateRequestStatus(id, nextStatus);
      setData((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      await refetch();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="panel">
      <header className="panel__header">
        <div className="container panel__header-inner">
          <div>
            <h1 className="panel__title">Заявки</h1>
            <p className="panel__subtitle">
              Всего: {counts.total} · Новых: {counts.pending}
            </p>
          </div>
          <div className="panel__actions">
            <Button variant="secondary" size="small" onClick={refetch}>
              Обновить
            </Button>
            <Link to="/" className="panel__link">
              На сайт
            </Link>
          </div>
        </div>
      </header>

      <main className="container panel__main">
        <div className="panel__filters" role="tablist">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={filter === option.value}
              className={`panel__filter${filter === option.value ? ' panel__filter--active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <p className="panel__status">Загружаем заявки…</p>
        )}
        {status === 'error' && (
          <p className="panel__status panel__status--error">{error}</p>
        )}
        {status === 'success' && (
          <RequestList
            requests={filtered}
            onStatusChange={handleStatusChange}
            busyId={busyId}
          />
        )}
      </main>
    </div>
  );
}
