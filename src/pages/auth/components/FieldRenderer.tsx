import React from 'react'
import { FormField } from '.'
import { FIELD_ROWS, type FieldConfig } from '../data'
import type { RegistrationFormData, FormErrors } from '../types'

interface FieldRendererProps {
  sectionId: string
  fields: FieldConfig[]
  formData: RegistrationFormData
  errors: FormErrors
  updateField: (field: keyof RegistrationFormData, value: string) => void
  formatHandlers: Record<string, (value: string) => void>
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  sectionId,
  fields,
  formData,
  errors,
  updateField,
  formatHandlers
}) => {
  const rows = FIELD_ROWS[sectionId as keyof typeof FIELD_ROWS] || []

  const renderField = (field: FieldConfig) => {
    const handleChange = field.useCustomHandler && formatHandlers[field.name]
      ? (value: string) => formatHandlers[field.name](value)
      : (value: string) => updateField(field.name, value)

    return (
      <FormField
        key={field.name}
        label={field.label}
        name={field.name}
        type={field.type}
        value={formData[field.name]}
        onChange={handleChange}
        error={errors[field.name]}
        placeholder={field.placeholder}
        required={field.required}
        maxLength={field.maxLength}
        pattern={field.pattern}
      />
    )
  }

  return (
    <>
      {rows.map((row, rowIndex) => {
        if (row.length === 1) {
          const field = fields.find(f => f.name === row[0])
          return field ? renderField(field) : null
        } else {
          return (
            <div key={rowIndex} className="form-row">
              {row.map(fieldName => {
                const field = fields.find(f => f.name === fieldName)
                return field ? renderField(field) : null
              })}
            </div>
          )
        }
      })}
    </>
  )
}
