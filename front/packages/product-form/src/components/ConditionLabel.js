import React from 'react'

import './ConditionLabel.css'

export default function ConditionLabel ({ label, className = '' }) {
  return <div className={`row ConditionLabel ${className}`}>
    <div className="col-md-12">
      <label>{label}</label>
    </div>
  </div>
}