
import { useState } from 'react'
import {
  FileText,
  CheckCircle2,
  Clock3,
  ChevronDown,
  ChevronRight,
  FolderCheck,
} from 'lucide-react'

import {
  evidence,
  suppliers,
  requirements,
  components,
} from '../data/demoData'

import './KeyEvidence.css'

export default function KeyEvidence() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Show one representative record per supplier.
  // Prioritize documents awaiting review.
  const keyDocuments = suppliers.flatMap(supplier => {
    const documents = evidence.filter(
      document => document.supplierId === supplier.id
    )

    if (documents.length === 0) return []

    const selected =
      documents.find(document => document.status === 'pending') ??
      documents[0]

    return [selected]
  })

  const approvedCount = evidence.filter(
    document => document.status === 'approved'
  ).length

  return (
    <div className="evidence-card">

      {/* WIDGET HEADER */}
      <div className="evidence-header">
        <h3>Key Evidence</h3>
        <FolderCheck size={19} />
      </div>

      {/* SUMMARY */}
      <div className="evidence-summary">
        <div>
          <strong>{evidence.length}</strong>
          <span>Total Records</span>
        </div>

        <div>
          <strong>{approvedCount}</strong>
          <span>Approved</span>
        </div>

        <div>
          <strong>{evidence.length - approvedCount}</strong>
          <span>Pending</span>
        </div>
      </div>

      {/* DOCUMENT LIST */}
      <div className="evidence-list">
        {keyDocuments.map(document => {
          const supplier = suppliers.find(
            item => item.id === document.supplierId
          )

          const requirement = requirements.find(
            item => item.evidenceId === document.id
          )

          const component = components.find(
            item => item.id === requirement?.componentId
          )

          const isApproved = document.status === 'approved'
          const isExpanded = expandedId === document.id

          return (
            <div
              key={document.id}
              className="evidence-entry"
            >

              {/* CLICKABLE DOCUMENT */}
              <button
                type="button"
                className="evidence-item"
                aria-expanded={isExpanded}
                aria-controls={`evidence-${document.id}`}
                onClick={() =>
                  setExpandedId(
                    isExpanded ? null : document.id
                  )
                }
              >
                <div className="evidence-icon">
                  <FileText size={19} />
                </div>

                <div className="evidence-info">
                  <strong>{document.name}</strong>
                  <span>{supplier?.name ?? 'Unknown supplier'}</span>
                </div>

                <span className={`evidence-badge ${document.status}`}>
                  {isApproved ? (
                    <CheckCircle2 size={13} />
                  ) : (
                    <Clock3 size={13} />
                  )}

                  {isApproved ? 'Approved' : 'Pending'}
                </span>

                {isExpanded ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>

              {/* EXPANDABLE DETAILS */}
              {isExpanded && (
                <div
                  id={`evidence-${document.id}`}
                  className="evidence-details"
                >
                  <div className="evidence-detail-row">
                    <span>Evidence ID</span>
                    <strong>{document.id}</strong>
                  </div>

                  <div className="evidence-detail-row">
                    <span>Document Type</span>
                    <strong>{document.type}</strong>
                  </div>

                  <div className="evidence-detail-row">
                    <span>Supplier</span>
                    <strong>{supplier?.name ?? 'Unassigned'}</strong>
                  </div>

                  <div className="evidence-detail-row">
                    <span>Linked Component</span>
                    <strong>{component?.name ?? 'Not linked'}</strong>
                  </div>

                  <div className="evidence-detail-row">
                    <span>Requirement</span>
                    <strong>
                      {requirement?.title ?? 'Not linked'}
                    </strong>
                  </div>

                  <p className="evidence-demo-note">
                    Demonstration metadata only.
                    No physical document is attached.
                  </p>
                </div>
              )}

            </div>
          )
        })}
      </div>

      {/* FOOTER */}
      <div className="evidence-footer">
        <span>{keyDocuments.length} highlighted records</span>
        <span>BAT-001</span>
      </div>

    </div>
  )
}
