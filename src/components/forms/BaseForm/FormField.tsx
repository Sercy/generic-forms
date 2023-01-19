import { ErrorMessage } from '@hookform/error-message'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

import classNames from 'classnames'
import { InputField } from './InputField'

interface IInput {
	Component: typeof InputField
	ErrorMessage: typeof ErrorMessage
}

type IInputs = IInput

const Inputs: Record<string, IInputs> = {
	input: { Component: InputField, ErrorMessage },
}

interface FormFieldProps extends Omit<ControllerRenderProps<FieldValues, string>, 'ref' | 'value'> {
	autoFocus?: boolean
	defaultValue?: string | string[] | number
	invalid: boolean
	isLoading?: boolean
	label?: string
	placeholder?: string
	type: keyof typeof Inputs
}

export const FormField = ({
	autoFocus,
	defaultValue,
	invalid,
	isLoading,
	label,
	name,
	onBlur,
	onChange,
	placeholder,
	type,
}: FormFieldProps) => {
	const { Component, ErrorMessage } = Inputs[type]

	return (
		<>
			<div className={classNames({error: invalid})}>
        <label htmlFor={name} className={classNames({error: invalid})}>
          {label}
        </label>
				<Component
					autoFocus={autoFocus}
					defaultValue={defaultValue}
					id={name}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					placeholder={placeholder || label}
					disabled={isLoading}
				/>
			</div>
			<ErrorMessage name={name} />
		</>
	)
}
