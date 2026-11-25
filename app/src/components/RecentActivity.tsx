
import { useState } from 'react'
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Package,
  ChevronDown,
  ChevronRight,
  Activity,
} from 'lucide-react'

import './RecentActivity.css'

type ActivityType =
  | 'document'
  | 'approved'
  | 'warning'
  | 'product'

type ActivityEvent = {
  id: string
  type: ActivityType
  title: string
  description: string
  date: string
  details: string
}

const demoActivities: ActivityEvent[] = [
  {
    id: 'ACT-001',
    type: 'document',
    title: 'Supplier evidence received',
    description: 'NordCell Energy — Material Declaration',
    date: '25 Nov 2026',
    details:
      'Material declaration associated with the Battery Cells component (CMP-001). Evidence record: EVD-003.',
  },
  {
    id: 'ACT-002',
    type: 'approved',
    title: 'Evidence approved',
    description: 'Thermal Test Report — ElectraTech',
    date: '24 Nov 2026',
    details:
      'The thermal testing evidence (EVD-011) is approved and linked to the Thermal Management component.',
  },
  {
    id: 'ACT-003',
    type: 'warning',
    title: 'Compliance gap identified',
    description: 'Cell lifecycle assessment missing',
    date: '22 Nov 2026',
    details:
      'Battery Cells requires an approved lifecycle assessment. The requirement remains outstanding.',
  },
  {
    id: 'ACT-004',
    type: 'product',
    title: 'Product record updated',
    description: 'BAT-001 — Version 1.2',
    date: '20 Nov 2026',
    details:
      'The high-voltage battery pack record was updated to version 1.2.',
  },
]

const activityIcons = {
  document: FileText,
  approved: CheckCircle2,
  warning: AlertTriangle,
  product: Package,
}

export default function RecentActivity() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="activity-card">

      <div className="activity-header">
        <h3>Recent Activity</h3>
        <Activity size={19} />
      </div>

      <div className="activity-list">
        {demoActivities.map(event => {
          const Icon = activityIcons[event.type]
          const isExpanded = expandedId === event.id

          return (
            <div key={event.id} className="activity-entry">

              <button
                type="button"
                className="activity-item"
                aria-expanded={isExpanded}
                onClick={() =>
                  setExpandedId(isExpanded ? null : event.id)
                }
              >
                <div className={`activity-icon ${event.type}`}>
                  <Icon size={18} />
                </div>

                <div className="activity-info">
                  <strong>{event.title}</strong>
                  <span>{event.description}</span>
                </div>

                <span className="activity-date">
                  {event.date}
                </span>

                {isExpanded ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>

              {isExpanded && (
                <div className="activity-details">
                  <span>Activity Details</span>
                  <p>{event.details}</p>
                  <small>Event ID: {event.id}</small>
                </div>
              )}

            </div>
          )
        })}
      </div>

      <div className="activity-footer">
        <span>{demoActivities.length} demonstration events</span>
        <span>BAT-001</span>
      </div>

    </div>
  )
}
