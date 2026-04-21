import Button from '../Button/Button';
import { REQUEST_STATUS } from '../../api/requests';
import './RequestList.css';

const STATUS_LABELS = {
  [REQUEST_STATUS.PENDING]: 'В ожидании',
  [REQUEST_STATUS.APPROVED]: 'Одобрена',
  [REQUEST_STATUS.REJECTED]: 'Отклонена',
};

function formatDate(iso) {
  if (!iso) return '—';
  const date = new Date(iso);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function RequestList({ requests, onStatusChange, busyId }) {
  if (requests.length === 0) {
    return <p className="request-list__empty">Заявок пока нет</p>;
  }

  return (
    <ul className="request-list">
      {requests.map((request) => (
        <li key={request.id} className="request-card">
          <div className="request-card__header">
            <h3 className="request-card__name">
              {request.name} {request.surname}
            </h3>
            <span className={`request-card__status request-card__status--${request.status}`}>
              {STATUS_LABELS[request.status] ?? request.status}
            </span>
          </div>
          <dl className="request-card__meta">
            <div>
              <dt>Телефон</dt>
              <dd>
                <a href={`tel:${request.phone}`}>{request.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Дата съёмки</dt>
              <dd>{formatDate(request.date)}</dd>
            </div>
            <div>
              <dt>Создана</dt>
              <dd>{formatDate(request.createdAt)}</dd>
            </div>
          </dl>
          {request.comment && (
            <p className="request-card__comment">{request.comment}</p>
          )}
          {request.status === REQUEST_STATUS.PENDING && (
            <div className="request-card__actions">
              <Button
                variant="success"
                size="small"
                disabled={busyId === request.id}
                onClick={() =>
                  onStatusChange(request.id, REQUEST_STATUS.APPROVED)
                }
              >
                Одобрить
              </Button>
              <Button
                variant="danger"
                size="small"
                disabled={busyId === request.id}
                onClick={() =>
                  onStatusChange(request.id, REQUEST_STATUS.REJECTED)
                }
              >
                Отклонить
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
