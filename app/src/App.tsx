
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

  return (
    <div className="application">
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
              className={`nav-item ${activePage === label ? 'active' : ''}`}
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

      <main className="main-area">
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
                placeholder="Search products, components, suppliers..."
              />
            </div>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <div className="avatar">FC</div>
          </div>
        </header>

        <section className="page-content">
          <div className="page-intro">
            <span className="eyebrow">Carneiro Automotive Platform</span>
            <h1>{activePage}</h1>
            <p>
              Battery compliance, supplier traceability and lifecycle management.
            </p>
          </div>

          <div className="placeholder-panel">
            <h2>{activePage}</h2>
            <p>
              This section will be developed as part of the Carneiro
              Automotive platform.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
