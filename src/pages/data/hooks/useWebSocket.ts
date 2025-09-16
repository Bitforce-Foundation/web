import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseWebSocketResult, WebSocketHookConfig } from '../types';

export function useWebSocket<T>(config: WebSocketHookConfig): UseWebSocketResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);
  
  const maxReconnectAttempts = config.maxReconnectAttempts || 5;
  const reconnectInterval = config.reconnectInterval || 3000;

  const connect = useCallback(() => {
    try {
      console.log(`🔌 Connecting to WebSocket: ${config.url}`);
      setError(null);
      
      ws.current = new WebSocket(config.url);
      
      ws.current.onopen = () => {
        console.log(`✅ WebSocket connected: ${config.url}`);
        setIsConnected(true);
        setError(null);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log(`📨 WebSocket data received:`, parsedData);
          setData({
            ...parsedData,
            timestamp: Date.now(),
            connectionStatus: 'connected' as const
          });
        } catch (err) {
          console.error('❌ Error parsing WebSocket message:', err);
          setError('Ошибка парсинга данных');
        }
      };

      ws.current.onclose = (event) => {
        console.log(`🔌 WebSocket closed: ${config.url}`, event.code, event.reason);
        setIsConnected(false);
        
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(reconnectInterval * Math.pow(2, reconnectAttempts.current), 30000);
          console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`);
          
          reconnectTimeout.current = setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, delay);
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setError('Превышено максимальное количество попыток переподключения');
        }
      };

      ws.current.onerror = (event) => {
        console.error('❌ WebSocket error:', event);
        setError('Ошибка подключения к WebSocket');
        setIsConnected(false);
      };

    } catch (err) {
      console.error('❌ Error creating WebSocket connection:', err);
      setError('Не удалось создать WebSocket соединение');
    }
  }, [config.url, maxReconnectAttempts, reconnectInterval]);

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
    
    if (ws.current) {
      ws.current.close(1000, 'Manual disconnect');
      ws.current = null;
    }
    
    setIsConnected(false);
    reconnectAttempts.current = 0;
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttempts.current = 0;
    connect();
  }, [connect, disconnect]);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    data,
    isConnected,
    error,
    reconnect,
  };
}