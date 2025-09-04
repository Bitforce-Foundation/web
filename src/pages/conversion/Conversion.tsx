import { memo } from 'react'
import './Conversion.css'

const Conversion = memo(() => {
  return (
    <div className="conversion-page">
      <div className="container-conversion">
        <h1 className="page-title">Конвертация</h1>
        <p className="page-description">
          Эта страница находится в разработке. Здесь будет представлен сервис конвертации криптовалют.
        </p>
        <div className="coming-soon">
          <span className="coming-soon-text">Скоро...</span>
        </div>
      </div>
    </div>
  )
})

Conversion.displayName = 'Conversion'

export default Conversion
