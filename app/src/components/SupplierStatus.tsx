
import { Building2, ChevronRight } from 'lucide-react'
import './SupplierStatus.css'

import {
  suppliers,
  requirements,
  evidence,
} from '../data/demoData'

export default function SupplierStatus() {
  const supplierReadiness = suppliers.map(supplier => {
    const supplierRequirements = requirements.filter(
      requirement => requirement.supplierId === supplier.id
    )

    const approved = supplierRequirements.filter(
      requirement =>
        requirement.evidenceId !== null &&
        evidence.some(
          document =>
            document.id === requirement.evidenceId &&
            document.status === 'approved'
        )
    ).length

    const total = supplierRequirements.length

    return {
      ...supplier,
      approved,
      total,
      readiness: total > 0
        ? Math.round((approved / total) * 100)
        : 0,
    }
  })

  return (
    <div className="supplier-card">
      <div className="supplier-header">
        <h3>Supplier Status</h3>
        <Building2 size={19} />
      </div>

      <div className="supplier-list">
        {supplierReadiness.map(supplier => (
          <button
            key={supplier.id}
            className="supplier-item"
            onClick={() => {
              window.alert(
                `${supplier.name}\n` +
                `Country: ${supplier.country}\n` +
                `Approved: ${supplier.approved}/${supplier.total}\n` +
                `Readiness: ${supplier.readiness}%`
              )
            }}
          >
            <div className="supplier-info">
              <div className="supplier-name-row">
                <strong>{supplier.name}</strong>
                <span>{supplier.readiness}%</span>
              </div>

              <div className="supplier-progress">
                <div
                  className="supplier-progress-fill"
                  style={{ width: `${supplier.readiness}%` }}
                />
              </div>

              <div className="supplier-meta">
                <span>{supplier.country}</span>
                <span>
                  {supplier.approved}/{supplier.total} requirements
                </span>
              </div>
            </div>

            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  )
}
