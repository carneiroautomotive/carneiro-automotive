
import { AlertTriangle, ChevronRight } from 'lucide-react'
import './GapAnalysis.css'

import {
  requirements,
  suppliers,
  components,
  evidence,
} from '../data/demoData'

export default function GapAnalysis() {
  const approvedEvidence = new Set(
    evidence
      .filter(document => document.status === 'approved')
      .map(document => document.id)
  )

  const gaps = requirements.filter(
    requirement =>
      !requirement.evidenceId ||
      !approvedEvidence.has(requirement.evidenceId)
  )

  return (
    <div className="gap-card">
      <div className="gap-header">
        <h3>Compliance Gap Analysis</h3>
        <AlertTriangle size={19} />
      </div>

      <div className="gap-summary">
        <strong>{gaps.length}</strong>
        <span>Outstanding requirements</span>
      </div>

      <div className="gap-list">
        {gaps.map(requirement => {
          const supplier = suppliers.find(
            item => item.id === requirement.supplierId
          )

          const component = components.find(
            item => item.id === requirement.componentId
          )

          return (
            <button
              key={requirement.id}
              className="gap-item"
              title={`${component?.name} — ${supplier?.name}`}
              onClick={() => {
                window.alert(
                  `${requirement.title}\n\n` +
                  `Component: ${component?.name}\n` +
                  `Supplier: ${supplier?.name}\n` +
                  `Status: Missing approved evidence`
                )
              }}
            >
              <div className="gap-item-icon">
                <AlertTriangle size={15} />
              </div>

              <div className="gap-item-content">
                <strong>{requirement.title}</strong>
                <span>
                  {component?.name} · {supplier?.name}
                </span>
              </div>

              <ChevronRight size={16} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
