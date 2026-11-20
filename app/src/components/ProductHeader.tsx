
import { useState } from 'react'
import { BatteryCharging } from 'lucide-react'
import './ProductHeader.css'

const tabs = [
  'Overview',
  'Technical Data',
  'Compliance',
  'Suppliers',
  'Evidence',
  'Lifecycle',
  'Configuration',
]

export default function ProductHeader() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="product-section">
      <div className="battery-header">
        <div className="battery-image">
          <BatteryCharging size={72} strokeWidth={1} />
        </div>

        <div className="battery-details">
          <div className="battery-title-row">
            <div>
              <span className="battery-category">
                Battery System
              </span>
              <h2>BAT-001</h2>
              <p>High-voltage battery pack (400 V, 82 kWh)</p>
            </div>

            <span className="battery-status">
              <span className="battery-status-dot" />
              In Development
            </span>
          </div>

          <div className="battery-specifications">
            <div>
              <span>VOLTAGE</span>
              <strong>400 V</strong>
            </div>
            <div>
              <span>CAPACITY</span>
              <strong>82 kWh</strong>
            </div>
            <div>
              <span>CHEMISTRY</span>
              <strong>NMC</strong>
            </div>
            <div>
              <span>CONFIGURATION</span>
              <strong>96s2p</strong>
            </div>
            <div>
              <span>VERSION</span>
              <strong>v1.2</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`product-tab ${activeTab === tab ? 'selected' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
