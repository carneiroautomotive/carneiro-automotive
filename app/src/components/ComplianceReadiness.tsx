
import { ShieldCheck } from 'lucide-react'
import {
  requirements,
  evidence,
  calculateReadiness,
} from '../data/demoData'

import './ComplianceReadiness.css'

export default function ComplianceReadiness() {
  const readiness = calculateReadiness(requirements, evidence)

  const approved = requirements.filter(requirement =>
    evidence.some(
      document =>
        document.id === requirement.evidenceId &&
        document.status === 'approved'
    )
  ).length

  const outstanding = requirements.length - approved

  return (
    <div className="readiness-card">
      <div className="readiness-header">
        <h3>Compliance Readiness</h3>
        <ShieldCheck size={19} />
      </div>

      <div className="readiness-body">
        <div
          className="readiness-circle"
          style={{
            background: `conic-gradient(
              #318ee8 ${readiness}%,
              #26394b ${readiness}% 100%
            )`,
          }}
        >
          <div className="readiness-circle-inner">
            <strong>{readiness}%</strong>
            <span>Readiness</span>
          </div>
        </div>

        <div className="readiness-stats">
          <div>
            <span>Approved</span>
            <strong>{approved}</strong>
          </div>
          <div>
            <span>Outstanding</span>
            <strong>{outstanding}</strong>
          </div>
          <div>
            <span>Total requirements</span>
            <strong>{requirements.length}</strong>
          </div>
        </div>
      </div>

      <p className="readiness-footer">
        Based on linked and approved evidence records.
      </p>
    </div>
  )
}
