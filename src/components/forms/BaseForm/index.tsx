import { yupResolver } from '@hookform/resolvers/yup'
import { ComponentProps, useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { AnyObjectSchema } from 'yup'
import { AnyObject } from 'yup/lib/object'

import { FormField } from './FormField'

type TFormField = ComponentProps<typeof FormField>
interface Field {
  fieldName: string
  fieldType: TFormField['type']
  defaultValue?: TFormField['defaultValue']
  placeholder?: TFormField['placeholder']
}

interface BaseFormProps {
  isLoading?: boolean
  fields: Field[]
  onSubmit: (data: Record<string, any>) => void
  onDiscard?: () => void
  scheme: AnyObjectSchema
  validateOnLoad?: boolean
}
export const BaseForm = ({
  fields,
  isLoading,
  onSubmit,
  onDiscard,
  scheme,
  validateOnLoad = true,
}: BaseFormProps) => {
  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(scheme),
  })

  const {
    control,
    getValues,
    formState: { errors },
    trigger,
  } = formMethods

  useEffect(() => {
    validateOnLoad && trigger()
  }, [trigger, validateOnLoad])

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={event => {
          if (Object.entries(errors).length === 0) {
            event.preventDefault()
            onSubmit(getValues())
          }
        }}
      >
        {fields.map(({ fieldName, fieldType, defaultValue, placeholder }, idx) => {
          const schemeField = scheme.fields[fieldName] as AnyObject

          if (!schemeField) {
            return null
          }

          return (
            <Controller
              key={fieldName}
              control={control}
              name={fieldName}
              defaultValue={defaultValue}
              render={({ field: { name, onBlur, onChange }, fieldState: { invalid } }) => (
                <FormField
                  key={idx}
                  autoFocus={idx === 0}
                  defaultValue={defaultValue}
                  invalid={invalid}
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder={placeholder}
                  label={schemeField.spec?.label}
                  type={fieldType}
                  isLoading={isLoading}
                />
              )}
            />
          )
        })}
        <div>
          <input type="button" onClick={onDiscard} value="Cancel" />
          <input type="submit" value="Apply" />
        </div>
      </form>
    </FormProvider>
  )
}
