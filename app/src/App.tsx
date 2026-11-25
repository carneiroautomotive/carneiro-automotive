
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  ClipboardList,
  ShieldCheck,
  AlertTriangle,
  FolderOpen,
  RefreshCw,
  Plug,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react'

import ProductHeader from './components/ProductHeader'
import LoginPage from './components/LoginPage'
import ComplianceReadiness from './components/ComplianceReadiness'
import GapAnalysis from './components/GapAnalysis'
import SupplierStatus from './components/SupplierStatus'
import ProductStructure from './components/ProductStructure'
import RecentActivity from './components/RecentActivity'
import KeyEvidence from './components/KeyEvidence'
import './App.css'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Products', icon: Package },
  { label: 'Components', icon: Boxes },
  { label: 'Suppliers', icon: Users },
  { label: 'Data Intake', icon: ClipboardList },
  { label: 'Compliance', icon: ShieldCheck },
  { label: 'Gap Analysis', icon: AlertTriangle },
  { label: 'Evidence', icon: FolderOpen },
  { label: 'Lifecycle', icon: RefreshCw },
  { label: 'API & Integration', icon: Plug },
]

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [showLogin, setShowLogin] = useState(false)
  const [welcomeUser, setWelcomeUser] = useState('')
  if (showLogin) {
    return (
      <LoginPage
        onLogin={(username) => {
          setWelcomeUser(username)
          setShowLogin(false)
          setActivePage('Overview')
        }}
      />
    )
  }
  return (
    <div className="application">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-symbol">▰▰</span>

          <div className="brand-name">
            <strong>CARNEIRO</strong>
            <span>AUTOMOTIVE</span>
          </div>
        </div>

        <nav className="sidebar-navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${
                activePage === label ? 'active' : ''
              }`}
              onClick={() => setActivePage(label)}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="demo-status">
          <span className="status-indicator" />

          <div>
            <span>Demo (Offline)</span>
            <small>v0.9.0</small>
          </div>
        </div>
      </aside>

      {/* MAIN APPLICATION */}
      <main className="main-area">

        {/* TOP NAVIGATION */}
        <header className="topbar">
          <div className="topbar-left">
            <span>Products</span>
            <span className="breadcrumb-arrow">›</span>

            <button className="product-select">
              BAT-001 — HV Battery Pack
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={17} />

              <input
                type="search"
                placeholder="Search products, components, suppliers..."
                aria-label="Search platform"
              />
            </div>

            <button
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            <button
                className="avatar"
                type="button"
                title="Open demonstration login"
                aria-label="Open demonstration login"
                onClick={() => setShowLogin(true)}
              >
                FC
              </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <section className="page-content">
        {welcomeUser && (
            <div
              role="status"
              style={{
                marginBottom: '18px',
                padding: '12px 16px',
                background: '#173b34',
                border: '1px solid #32695b',
                borderRadius: '8px',
                color: '#a1e5c7',
                fontSize: '13px',
              }}
            >
              Welcome, {welcomeUser}! Demo session started.
            </div>
          )}

          {activePage === 'Overview' ? (

            <>
              {/* BATTERY PRODUCT HEADER */}
              <ProductHeader />

              {/* DASHBOARD WIDGETS */}
              <div className="dashboard-grid">
                <ComplianceReadiness />
                <GapAnalysis />
                <SupplierStatus />
                <ProductStructure />
                <RecentActivity />
                <KeyEvidence />


              </div>
            </>

          ) : (

            <div className="placeholder-panel">
              <h2>{activePage}</h2>
              <p>
                This section is under development.
              </p>
            </div>

          )}

        </section>

      </main>
    </div>
  )
}

export default App
