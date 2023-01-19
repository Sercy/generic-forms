import { TUser, UserSchema } from "../../../schemas"
import { createUser } from "../../../services"
import { BaseForm } from "../BaseForm"

export const CreateUserForm = ({ onCreate }: { onCreate?: (user: TUser) => void }) => {
  const onSubmit = async (values: Record<string, string>) => {
    const user = await createUser(values)
    onCreate?.(user)
  }

  return (
    <BaseForm
      fields={[
        { fieldName: 'firstName', fieldType: 'input', placeholder: 'First name' },
        { fieldName: 'lastName', fieldType: 'input', placeholder: 'Last name' },
        { fieldName: 'email', fieldType: 'input', placeholder: 'Email' },
      ]}
      onSubmit={onSubmit}
      scheme={UserSchema}
    />
  )
}
