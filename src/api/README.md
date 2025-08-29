# BitForce API Integration

## Обзор

Этот модуль обеспечивает интеграцию с BitForce API для получения данных о пулах, статусах и балансах.

## Структура

```
src/api/
├── config/
│   └── api.config.ts      # Конфигурация API и HTTP клиент
├── services/
│   └── poolsService.ts    # Сервис для работы с пулами
├── types/
│   └── pools.types.ts     # TypeScript типы для API
└── index.ts               # Основные экспорты
```

## API Endpoints

### Основные эндпоинты

- `GET /` - Информация об API
- `GET /health` - Проверка здоровья API
- `POST /check-connection` - Проверка подключения кошелька
- `POST /pool/status` - Получение статуса пула
- `POST /balance` - Получение баланса пула

### Конфигурация

```typescript
export const API_CONFIG = {
  baseURL: 'https://bitforce-api.ru',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
}
```

## Типы данных

### PoolData
```typescript
interface PoolData {
  id: number
  poolNumber: string        // pool_xxxxxxxx
  date: string             // Дата создания
  currentVolume: number    // Текущий объем USDT
  targetAmount: number     // Целевая сумма (по умолчанию 15000)
  currency: string         // Валюта (пока только USDT)
  status: 'active' | 'inactive' | 'fullfilled'
  poolAddress: string      // Адрес пула из API
  type?: 'buy' | 'sell'   // Тип пула для UI
}
```

### Статусы пулов
- `active` - Действительный
- `inactive` - Недействительный  
- `fullfilled` - Заполнен

## Использование

### Инициализация сервиса

```typescript
import { poolsService } from '../api'

// Автоматически инициализируется при импорте
// Проверяет доступность API и загружает данные
```

### Подписка на обновления

```typescript
// Подписка на обновления пулов
const unsubscribe = poolsService.subscribeToPoolsUpdates((pools) => {
  console.log('Получены обновления:', pools)
})

// Подписка на изменения статуса подключения
const unsubscribeStatus = poolsService.onConnectionStatusChange((status) => {
  console.log('Статус подключения:', status)
})

// Отписка
unsubscribe()
unsubscribeStatus()
```

### Получение данных

```typescript
// Получить все пулы
const pools = await poolsService.fetchPools()

// Получить пул по ID
const pool = await poolsService.fetchPoolById(1)

// Обновить пул
await poolsService.updatePool(1, { currentVolume: 1000 })

// Обновить все пулы
await poolsService.refreshPools()
```

### Фильтрация пулов

```typescript
// По типу
const buyPools = poolsService.getPoolsByType('buy')
const sellPools = poolsService.getPoolsByType('sell')

// По статусу
const activePools = poolsService.getPoolsByStatus('active')
const inactivePools = poolsService.getPoolsByStatus('inactive')
```

## Fallback режим

Если API недоступен, сервис автоматически переключается в fallback режим:

- Использует демо-данные на основе известных адресов пулов
- Показывает соответствующий статус подключения
- Позволяет тестировать UI без реального API

## Автообновление

Сервис автоматически обновляет данные каждые 30 секунд:

```typescript
// Запуск автообновления
poolsService.startAutoUpdate()

// Остановка автообновления
poolsService.stopAutoUpdate()
```

## Логирование

Все API вызовы логируются с префиксами:

- `[API Request]` - Запросы к API
- `[API Response]` - Ответы от API
- `[PoolsService]` - Операции сервиса пулов
- `[Home]`, `[Buy]`, `[Sell]` - Операции компонентов

## Обработка ошибок

```typescript
try {
  const pools = await poolsService.fetchPools()
} catch (error) {
  console.error('Ошибка загрузки пулов:', error)
  // Автоматически переключается в fallback режим
}
```

## Конфигурация окружения

```bash
# .env
VITE_API_URL=https://bitforce-api.ru
```

## Известные адреса пулов

```typescript
export const KNOWN_POOL_ADDRESSES = [
  'TJLVCCNffm5MqA4Wr8989E9FaYLWWrn9mP', // pool_06505339
  'TWqdGhMspmzDdangbYqG6KxN1Ro2msEFwz'  // pool_91513851
]
```

## Кнопки обновления

### Главная страница
- **"Обновить все"** - Обновляет все пулы
- **"🔄"** - Обновляет конкретный пул

### Страницы Buy/Sell
- **"🔄"** - Обновляет конкретный пул

## Разработка

### Добавление нового эндпоинта

1. Добавить в `API_ENDPOINTS`
2. Создать функцию в `api.config.ts`
3. Добавить типы в `pools.types.ts`
4. Интегрировать в `poolsService.ts`

### Тестирование

```bash
npm run dev
# Проверить консоль браузера на наличие логов API
# Проверить fallback режим при недоступности API
``` 
