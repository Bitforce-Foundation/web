import { memo } from 'react'
import Header from './components/header'
import HeroSection from './components/hero'
import { ContentSection } from './components/principes'
import { PositioningSection } from './components/positioning'
import Footer from '../../components/Footer'

import './components/header/Header.css'
import './components/hero/HeroSection.css'
import './components/principes/PrincipesSection.css'
import './components/positioning/PositioningSection.css'
import './components/common/Common.css'
import './Home.css'

const Home = memo(() => {
  return (
    <div className="app-root">
      <Header />
      
      <HeroSection />

      <ContentSection />

      <PositioningSection />
      
      <Footer />
    </div>
  )
})

Home.displayName = 'Home'

export default Home
