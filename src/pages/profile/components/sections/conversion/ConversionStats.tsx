import './ConversionStats.css'
import { Card, Stat, PeriodButton } from '../../common'
import { useState } from 'react'

const ConversionStats = ({ className = '' }: { className?: string }) => {
  const [activePeriod, setActivePeriod] = useState('month')

  const periods = [
    { id: 'week', label: 'Неделя' },
    { id: 'month', label: 'Месяц' },
    { id: 'quarter', label: 'Квартал' },
    { id: 'year', label: 'Год' }
  ]

  // Mock data - в реальном приложении данные будут приходить из API
  const stats = {
    week: {
      totalVolume: { value: 15420, currency: 'USD' },
      conversionsCount: 8,
      averageAmount: { value: 1927.5, currency: 'USD' },
      popularPair: 'USD → EUR',
      savings: { value: 245, currency: 'USD' }
    },
    month: {
      totalVolume: { value: 65830, currency: 'USD' },
      conversionsCount: 24,
      averageAmount: { value: 2742.9, currency: 'USD' },
      popularPair: 'USD → EUR',
      savings: { value: 1024, currency: 'USD' }
    },
    quarter: {
      totalVolume: { value: 198450, currency: 'USD' },
      conversionsCount: 67,
      averageAmount: { value: 2961.9, currency: 'USD' },
      popularPair: 'BTC → USD',
      savings: { value: 3180, currency: 'USD' }
    },
    year: {
      totalVolume: { value: 742680, currency: 'USD' },
      conversionsCount: 189,
      averageAmount: { value: 3929.5, currency: 'USD' },
      popularPair: 'USD → EUR',
      savings: { value: 12450, currency: 'USD' }
    }
  }

  const currentStats = stats[activePeriod as keyof typeof stats]

  return (
    <Card className={`conversion-stats ${className}`}>
      <div className="conversion-stats__header">
        <div className="conversion-stats__periods">
          {periods.map(period => (
            <PeriodButton
              key={period.id}
              period={period.id}
              label={period.label}
              isActive={activePeriod === period.id}
              onClick={() => setActivePeriod(period.id)}
            />
          ))}
        </div>
      </div>

      <div className="conversion-stats__grid">
        <Stat
          label="Общий объем"
          value={`$${currentStats.totalVolume.value.toLocaleString()}`}
          icon="account_balance_wallet"
          trend="positive"
        />

        <Stat
          label="Количество конвертаций"
          value={currentStats.conversionsCount}
          icon="swap_horiz"
          trend="positive"
        />

        <Stat
          label="Средняя сумма"
          value={`$${currentStats.averageAmount.value.toLocaleString()}`}
          icon="trending_up"
          trend="neutral"
        />

        <Stat
          label="Популярная пара"
          value={currentStats.popularPair}
          icon="currency_exchange"
          trend="neutral"
        />

        <Stat
          label="Сэкономлено на комиссиях"
          value={`$${currentStats.savings.value.toLocaleString()}`}
          icon="savings"
          trend="positive"
        />
      </div>

      <div className="conversion-stats__info">
        <div className="conversion-stats__info-item">
          <span className="material-icons">info</span>
          <span>Экономия рассчитывается относительно стандартных банковских курсов</span>
        </div>
      </div>
    </Card>
  )
}

export default ConversionStats
