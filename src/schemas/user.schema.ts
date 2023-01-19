import * as yup from 'yup'

export const UserSchema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required('required'),
  lastName: yup.string(),
  email: yup.string().email(),
})

export type TUser = ReturnType<typeof UserSchema['cast']>
