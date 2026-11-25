
import { useState } from 'react'
import {
  Package,
  Boxes,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react'

import {
  product,
  components,
  suppliers,
  requirements,
  evidence,
} from '../data/demoData'

import './ProductStructure.css'

export default function ProductStructure() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Identify evidence records that have been approved
  const approvedEvidenceIds = new Set(
    evidence
      .filter(document => document.status === 'approved')
      .map(document => document.id)
  )

  return (
    <div className="structure-card">

      {/* WIDGET HEADER */}
      <div className="structure-header">
        <h3>Product Structure</h3>
        <Boxes size={19} />
      </div>

      {/* MAIN BATTERY PRODUCT */}
      <div className="structure-product">
        <Package size={19} />

        <div className="structure-product-info">
          <strong>{product.id} — {product.name}</strong>
          <span>{components.length} linked components</span>
        </div>
      </div>

      {/* COMPONENT HIERARCHY */}
      <div className="structure-list">
        {components.map(component => {

          const supplier = suppliers.find(
            item => item.id === component.supplierId
          )

          const componentRequirements = requirements.filter(
            item => item.componentId === component.id
          )

          const approved = componentRequirements.filter(
            item =>
              item.evidenceId !== null &&
              approvedEvidenceIds.has(item.evidenceId)
          ).length

          const isExpanded = expandedId === component.id
          const isComplete = approved === componentRequirements.length

          return (
            <div
              key={component.id}
              className="structure-component"
            >

              {/* CLICKABLE COMPONENT */}
              <button
                type="button"
                className={`structure-item ${
                  isExpanded ? 'expanded' : ''
                }`}
                aria-expanded={isExpanded}
                aria-controls={`details-${component.id}`}
                onClick={() =>
                  setExpandedId(
                    isExpanded ? null : component.id
                  )
                }
              >
                <div className="structure-component-icon">
                  <Boxes size={17} />
                </div>

                <div className="structure-component-info">
                  <strong>{component.name}</strong>
                  <span>{supplier?.name ?? 'Unassigned'}</span>
                </div>

                <span className="structure-count">
                  {approved}/{componentRequirements.length}
                </span>

                {isComplete ? (
                  <CheckCircle2
                    size={17}
                    className="structure-success"
                  />
                ) : (
                  <AlertTriangle
                    size={17}
                    className="structure-warning"
                  />
                )}

                {isExpanded ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </button>

              {/* EXPANDABLE COMPONENT DETAILS */}
              {isExpanded && (
                <div
                  id={`details-${component.id}`}
                  className="structure-details"
                >
                  <div className="structure-detail-heading">
                    <strong>Component ID</strong>
                    <span>{component.id}</span>
                  </div>

                  <div className="structure-detail-heading">
                    <strong>Supplier</strong>
                    <span>{supplier?.name ?? 'Unassigned'}</span>
                  </div>

                  <div className="structure-requirements-title">
                    Requirements & Evidence
                  </div>

                  {componentRequirements.map(requirement => {

                    const document = evidence.find(
                      item => item.id === requirement.evidenceId
                    )

                    const isApproved =
                      document?.status === 'approved'

                    return (
                      <div
                        key={requirement.id}
                        className="structure-requirement"
                      >
                        {isApproved ? (
                          <CheckCircle2
                            size={15}
                            className="structure-success"
                          />
                        ) : (
                          <AlertTriangle
                            size={15}
                            className="structure-warning"
                          />
                        )}

                        <div>
                          <strong>{requirement.title}</strong>
                          <span>
                            {isApproved
                              ? document?.name
                              : 'Approved evidence missing'}
                          </span>
                        </div>

                        {isApproved && <FileText size={15} />}
                      </div>
                    )
                  })}
                </div>
              )}

            </div>
          )
        })}
      </div>

      {/* FOOTER */}
      <div className="structure-footer">
        <span>{components.length} Components</span>
        <span>{suppliers.length} Suppliers</span>
      </div>

    </div>
  )
}
