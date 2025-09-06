import React from 'react'
import Container from '../home/components/common/Container'
import './Profile.css'

const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <Container maxWidth="lg">
        <div className="profile-container">
          <h1>Личный кабинет</h1>
          <p>Добро пожаловать в личный кабинет!</p>
        </div>
      </Container>
    </div>
  )
}

export default Profile