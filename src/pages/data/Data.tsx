import React from 'react';
import { GasPriceCard, PriceCard } from './components';
import './Data.css';

const Data: React.FC = () => {
  return (
    <div className="data-page">
      <h1 className="data-page__title">Данные в реальном времени</h1>
      
      <div className="data-cards">
        <GasPriceCard />
        <PriceCard />
      </div>
      
      <div className="data-page__info">
        <p>
          Данные обновляются через WebSocket соединение каждую секунду.
          При разрыве соединения происходит автоматическое переподключение.
        </p>
      </div>
    </div>
  );
};

export default Data;