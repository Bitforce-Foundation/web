import React from 'react';
import { useGasPrice } from '../hooks';
import { DataCard } from './DataCard';

export const GasPriceCard: React.FC = () => {
  const { data, isConnected, error, reconnect } = useGasPrice();

  const formatGasPrice = (value: number | null) => {
    if (value === null || value === undefined) return '—';
    return `₽${value.toFixed(4)}`;
  };

  return (
    <DataCard
      title="🔥 Цена газа"
      data={data}
      isConnected={isConnected}
      error={error}
      onReconnect={reconnect}
      valueFormatter={formatGasPrice}
    />
  );
};