
export type Requirement = {
    id: string
    title: string
    category: string
    supplierId: string
    componentId: string
    evidenceId: string | null
  }
  
  export type Evidence = {
    id: string
    name: string
    type: string
    supplierId: string
    status: 'approved' | 'pending'
  }
  
  export const product = {
    id: 'BAT-001',
    name: 'High Voltage Battery Pack',
    voltage: 400,
    capacity: 82,
    chemistry: 'NMC',
    configuration: '96s2p',
    version: '1.2',
    status: 'In Development',
  }
  
  export const suppliers = [
    { id: 'SUP-001', name: 'NordCell Energy', country: 'Finland' },
    { id: 'SUP-002', name: 'VoltCore Systems', country: 'Germany' },
    { id: 'SUP-003', name: 'ElectraTech', country: 'Sweden' },
    { id: 'SUP-004', name: 'Precision Automotive', country: 'Italy' },
  ]
  
  export const components = [
    { id: 'CMP-001', name: 'Battery Cells', supplierId: 'SUP-001' },
    { id: 'CMP-002', name: 'Battery Management System', supplierId: 'SUP-002' },
    { id: 'CMP-003', name: 'Thermal Management', supplierId: 'SUP-003' },
    { id: 'CMP-004', name: 'Battery Housing', supplierId: 'SUP-004' },
  ]
  
  export const evidence: Evidence[] = [
    { id: 'EVD-001', name: 'Cell Specifications', type: 'Technical', supplierId: 'SUP-001', status: 'approved' },
    { id: 'EVD-002', name: 'Cell Test Report', type: 'Testing', supplierId: 'SUP-001', status: 'approved' },
    { id: 'EVD-003', name: 'Material Declaration', type: 'Material', supplierId: 'SUP-001', status: 'approved' },
    { id: 'EVD-004', name: 'Cell Safety Assessment', type: 'Safety', supplierId: 'SUP-001', status: 'approved' },
    { id: 'EVD-005', name: 'Cell Traceability Record', type: 'Traceability', supplierId: 'SUP-001', status: 'approved' },
  
    { id: 'EVD-006', name: 'BMS Specifications', type: 'Technical', supplierId: 'SUP-002', status: 'approved' },
    { id: 'EVD-007', name: 'BMS Test Report', type: 'Testing', supplierId: 'SUP-002', status: 'approved' },
    { id: 'EVD-008', name: 'Software Version Record', type: 'Software', supplierId: 'SUP-002', status: 'approved' },
    { id: 'EVD-009', name: 'BMS Safety Assessment', type: 'Safety', supplierId: 'SUP-002', status: 'approved' },
  
    { id: 'EVD-010', name: 'Cooling System Specifications', type: 'Technical', supplierId: 'SUP-003', status: 'approved' },
    { id: 'EVD-011', name: 'Thermal Test Report', type: 'Testing', supplierId: 'SUP-003', status: 'approved' },
    { id: 'EVD-012', name: 'Cooling System Material Data', type: 'Material', supplierId: 'SUP-003', status: 'approved' },
  
    { id: 'EVD-013', name: 'Housing Specifications', type: 'Technical', supplierId: 'SUP-004', status: 'approved' },
    { id: 'EVD-014', name: 'Mechanical Test Report', type: 'Testing', supplierId: 'SUP-004', status: 'approved' },
  ]
  
  const entries: [string, string, string, string, string | null][] = [
    ['Cell technical specifications', 'Technical', 'SUP-001', 'CMP-001', 'EVD-001'],
    ['Cell performance testing', 'Testing', 'SUP-001', 'CMP-001', 'EVD-002'],
    ['Cell material declaration', 'Material', 'SUP-001', 'CMP-001', 'EVD-003'],
    ['Cell safety assessment', 'Safety', 'SUP-001', 'CMP-001', 'EVD-004'],
    ['Cell traceability', 'Traceability', 'SUP-001', 'CMP-001', 'EVD-005'],
    ['Cell lifecycle assessment', 'Lifecycle', 'SUP-001', 'CMP-001', null],
  
    ['BMS technical specifications', 'Technical', 'SUP-002', 'CMP-002', 'EVD-006'],
    ['BMS functional testing', 'Testing', 'SUP-002', 'CMP-002', 'EVD-007'],
    ['Software version traceability', 'Software', 'SUP-002', 'CMP-002', 'EVD-008'],
    ['BMS safety assessment', 'Safety', 'SUP-002', 'CMP-002', 'EVD-009'],
    ['Software vulnerability evidence', 'Software', 'SUP-002', 'CMP-002', null],
  
    ['Cooling system specifications', 'Technical', 'SUP-003', 'CMP-003', 'EVD-010'],
    ['Thermal performance testing', 'Testing', 'SUP-003', 'CMP-003', 'EVD-011'],
    ['Cooling system material data', 'Material', 'SUP-003', 'CMP-003', 'EVD-012'],
    ['Cooling system maintenance record', 'Lifecycle', 'SUP-003', 'CMP-003', null],
  
    ['Housing technical specifications', 'Technical', 'SUP-004', 'CMP-004', 'EVD-013'],
    ['Housing mechanical testing', 'Testing', 'SUP-004', 'CMP-004', 'EVD-014'],
    ['Housing material traceability', 'Traceability', 'SUP-004', 'CMP-004', null],
    ['Housing recycling information', 'Lifecycle', 'SUP-004', 'CMP-004', null],
  ]
  
  export const requirements: Requirement[] = entries.map(
    ([title, category, supplierId, componentId, evidenceId], index) => ({
      id: `REQ-${String(index + 1).padStart(3, '0')}`,
      title,
      category,
      supplierId,
      componentId,
      evidenceId,
    })
  )
  
  export function calculateReadiness(
    items: Requirement[],
    documents: Evidence[]
  ) {
    if (items.length === 0) return 0
  
    const approvedIds = new Set(
      documents
        .filter(doc => doc.status === 'approved')
        .map(doc => doc.id)
    )
  
    const completed = items.filter(
      requirement =>
        requirement.evidenceId !== null &&
        approvedIds.has(requirement.evidenceId)
    ).length
  
    return Math.round((completed / items.length) * 100)
  }
  