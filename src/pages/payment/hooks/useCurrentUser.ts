import { useState, useEffect } from 'react';
import { GetSessionAPI } from '../../registration/api/methods/session/get';
import { TokenManager } from '../../registration/utils';
import type { User } from '../types';
import type { SessionInfo } from '../../registration/types';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Session_id из localStorage
        const sessionId = TokenManager.getSessionId();
        
        if (!sessionId) {
          throw new Error('Сессия не найдена. Пожалуйста, войдите в систему.');
        }

        // Информация о сессии
        const sessionInfo: SessionInfo = await GetSessionAPI.get_session_by_id(sessionId);
        
        if (!sessionInfo.user_id) {
          throw new Error('Информация о пользователе недоступна');
        }

        // Создает объект пользователя
        const currentUser: User = {
          id: sessionInfo.user_id,
        };

        setUser(currentUser);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка получения данных пользователя';
        setError(errorMessage);
        console.error('Error fetching current user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const refetchUser = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sessionId = TokenManager.getSessionId();
      
      if (!sessionId) {
        throw new Error('Сессия не найдена. Пожалуйста, войдите в систему.');
      }

      const sessionInfo: SessionInfo = await GetSessionAPI.get_session_by_id(sessionId);
      
      if (!sessionInfo.user_id) {
        throw new Error('Информация о пользователе недоступна');
      }

      const currentUser: User = {
        id: sessionInfo.user_id,
      };

      setUser(currentUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка получения данных пользователя';
      setError(errorMessage);
      console.error('Error refetching current user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    refetchUser,
  };
};
