import './ProfileLayout.css'
import type { ProfileLayoutProps } from './types'

const ProfileLayout = ({ 
  children, 
  sidebar, 
  mobileNavigation, 
  className = '' 
}: ProfileLayoutProps) => {
  return (
    <div className={`profile-layout ${className}`}>
      {/* Mobile Navigation */}
      <div className="profile-layout__mobile-nav">
        {mobileNavigation}
      </div>

      {/* Desktop Sidebar */}
      <div className="profile-layout__sidebar">
        {sidebar}
      </div>

      {/* Main Content */}
      <main className="profile-layout__main">
        <div className="profile-layout__content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default ProfileLayout
