import React from 'react';
import { usePrice } from '../hooks';
import { DataCard } from './DataCard';

export const PriceCard: React.FC = () => {
  const { data, isConnected, error, reconnect } = usePrice();

  const formatPrice = (value: number | null) => {
    if (value === null || value === undefined) return '—';
    return `₽${value.toLocaleString('ru-RU', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 8 
    })}`;
  };

  return (
    <DataCard
      title="💰 Курс"
      data={data}
      isConnected={isConnected}
      error={error}
      onReconnect={reconnect}
      valueFormatter={formatPrice}
    />
  );
};