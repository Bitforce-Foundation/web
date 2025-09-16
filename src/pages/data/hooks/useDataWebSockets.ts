import { useWebSocket } from './useWebSocket';
import type { GasPriceData, PriceData } from '../types';

const WS_BASE_URL = 'ws://localhost:4352/ws'; // изменить на домен в проде

export function useGasPrice() {
  return useWebSocket<GasPriceData>({
    url: `${WS_BASE_URL}/gas_price`,
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
  });
}

export function usePrice() {
  return useWebSocket<PriceData>({
    url: `${WS_BASE_URL}/price`,
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
  });
}