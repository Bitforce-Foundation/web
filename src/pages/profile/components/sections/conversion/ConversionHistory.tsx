import { useState } from 'react'
import './ConversionHistory.css'
import { Card, StatusBadge, LoadingSpinner, EmptyState } from '../../common'
import type { ConversionRecord } from '../types'

const ConversionHistory = ({ className = '' }: { className?: string }) => {
  const [isLoading] = useState(false)
  const [filter, setFilter] = useState('all')

  // Mock data - в реальном приложении данные будут приходить из API
  const conversions: ConversionRecord[] = [
    {
      id: '1',
      date: '2025-08-28T10:30:00Z',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      fromAmount: 1000,
      toAmount: 850,
      exchangeRate: 0.85,
      status: 'completed'
    },
    {
      id: '2',
      date: '2025-08-27T15:45:00Z',
      fromCurrency: 'BTC',
      toCurrency: 'USD',
      fromAmount: 0.5,
      toAmount: 22500,
      exchangeRate: 45000,
      status: 'completed'
    },
    {
      id: '3',
      date: '2025-08-26T09:15:00Z',
      fromCurrency: 'EUR',
      toCurrency: 'RUB',
      fromAmount: 500,
      toAmount: 45000,
      exchangeRate: 90,
      status: 'pending'
    },
    {
      id: '4',
      date: '2025-08-25T14:20:00Z',
      fromCurrency: 'USD',
      toCurrency: 'ETH',
      fromAmount: 2000,
      toAmount: 0.8,
      exchangeRate: 0.0004,
      status: 'failed'
    }
  ]

  const filteredConversions = conversions.filter(conversion => {
    if (filter === 'all') return true
    return conversion.status === filter
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'BTC' || currency === 'ETH') {
      return `${amount} ${currency}`
    }
    return `${amount.toLocaleString()} ${currency}`
  }

  const getStatusText = (status: ConversionRecord['status']) => {
    switch (status) {
      case 'completed': return 'Завершена'
      case 'pending': return 'В обработке'
      case 'failed': return 'Отклонена'
      default: return status
    }
  }

  if (isLoading) {
    return (
      <Card className={`conversion-history ${className}`}>
        <div className="conversion-history__loading">
          <LoadingSpinner size="lg" />
          <span>Загрузка истории...</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`conversion-history ${className}`}>
      <div className="conversion-history__header">
        <div className="conversion-history__filters">
          <button
            onClick={() => setFilter('all')}
            className={`conversion-history__filter ${filter === 'all' ? 'conversion-history__filter--active' : ''}`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`conversion-history__filter ${filter === 'completed' ? 'conversion-history__filter--active' : ''}`}
          >
            Завершенные
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`conversion-history__filter ${filter === 'pending' ? 'conversion-history__filter--active' : ''}`}
          >
            В обработке
          </button>
          <button
            onClick={() => setFilter('failed')}
            className={`conversion-history__filter ${filter === 'failed' ? 'conversion-history__filter--active' : ''}`}
          >
            Отклоненные
          </button>
        </div>
      </div>

      <div className="conversion-history__content">
        {filteredConversions.length === 0 ? (
          <EmptyState
            title="Нет конвертаций"
            description="История конвертаций по выбранному фильтру пуста"
            icon="history"
          />
        ) : (
          <div className="conversion-history__list">
            {filteredConversions.map(conversion => (
              <div key={conversion.id} className="conversion-history__item">
                <div className="conversion-history__item-header">
                  <div className="conversion-history__item-currencies">
                    <span className="conversion-history__currency">
                      {conversion.fromCurrency}
                    </span>
                    <span className="material-icons conversion-history__arrow">
                      arrow_forward
                    </span>
                    <span className="conversion-history__currency">
                      {conversion.toCurrency}
                    </span>
                  </div>
                  <StatusBadge status={conversion.status} size="sm" />
                </div>

                <div className="conversion-history__item-details">
                  <div className="conversion-history__amounts">
                    <div className="conversion-history__amount">
                      <span className="conversion-history__amount-label">Отправлено:</span>
                      <span className="conversion-history__amount-value">
                        {formatAmount(conversion.fromAmount, conversion.fromCurrency)}
                      </span>
                    </div>
                    <div className="conversion-history__amount">
                      <span className="conversion-history__amount-label">Получено:</span>
                      <span className="conversion-history__amount-value">
                        {formatAmount(conversion.toAmount, conversion.toCurrency)}
                      </span>
                    </div>
                  </div>

                  <div className="conversion-history__meta">
                    <div className="conversion-history__date">
                      {formatDate(conversion.date)}
                    </div>
                    <div className="conversion-history__status">
                      {getStatusText(conversion.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

export default ConversionHistory
