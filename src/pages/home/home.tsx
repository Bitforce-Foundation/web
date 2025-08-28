import { memo } from 'react'
import Header from './components/header'
import HeroSection from './components/hero'
import TradingSection, { TradingButtons } from './components/trading'
import ConversionSection from './components/conversion'
import AboutSection from './components/about'
import Footer from '../../components/Footer'

// Импорт стилей компонентов
import './components/header/Header.css'
import './components/hero/HeroSection.css'
import './components/trading/TradingSection.css'
import './components/conversion/ConversionSection.css'
import './components/about/AboutSection.css'
import './components/common/Common.css'
import './home.css'

const Home = memo(() => {
  return (
    <div className="app-root">
      <Header />
      
      <HeroSection />
      
      <TradingSection />
      
      <ConversionSection />
      
      <TradingButtons />
      
      <AboutSection />
      
      <Footer />
    </div>
  )
})

Home.displayName = 'Home'

export default Home
