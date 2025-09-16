import React from 'react';
import type { GasPriceData, PriceData } from '../types';

interface DataCardProps {
  title: string;
  data: GasPriceData | PriceData | null;
  isConnected: boolean;
  error: string | null;
  onReconnect: () => void;
  valueFormatter?: (value: number | null) => string;
  unit?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  data,
  isConnected,
  error,
  onReconnect,
  valueFormatter,
  unit = '',
}) => {
  const getStatusClass = () => {
    if (error) return 'data-card__status--error';
    if (!isConnected) return 'data-card__status--disconnected';
    if (isConnected && data) return 'data-card__status--connected';
    return 'data-card__status--connecting';
  };

  const getStatusText = () => {
    if (error) return 'Ошибка';
    if (!isConnected) return 'Отключено';
    if (isConnected && data) return 'Подключено';
    return 'Подключение...';
  };

  const formatValue = (value: number | null) => {
    if (value === null || value === undefined) return '—';
    
    if (valueFormatter) {
      return valueFormatter(value);
    }
    
    return `${value.toLocaleString('ru-RU', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 6 
    })} ${unit}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="data-card">
      <div className="data-card__header">
        <h3 className="data-card__title">{title}</h3>
        <span className={`data-card__status ${getStatusClass()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className={`data-card__value ${!data ? 'data-card__value--loading' : ''}`}>
        {formatValue(
          data && 'gas_price' in data ? data.gas_price :
          data && 'price' in data ? data.price : null
        )}
      </div>

      <div className="data-card__meta">
        <span className="data-card__timestamp">
          {data?.timestamp ? formatTimestamp(data.timestamp) : 'Нет данных'}
        </span>
      </div>

      {error && (
        <div className="data-card__error">
          <p className="data-card__error-message">{error}</p>
        </div>
      )}

      <div className="data-card__actions">
        <button 
          className="data-card__button data-card__button--primary"
          onClick={onReconnect}
          disabled={isConnected && !error}
        >
          {isConnected && !error ? 'Подключено' : 'Переподключить'}
        </button>
      </div>
    </div>
  );
};