export interface WebSocketData {
  timestamp: number;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
}

export interface GasPriceData extends WebSocketData {
  gas_price: number | null;
}

export interface PriceData extends WebSocketData {
  price: number | null;
}

export interface WebSocketHookConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export interface UseWebSocketResult<T> {
  data: T | null;
  isConnected: boolean;
  error: string | null;
  reconnect: () => void;
}