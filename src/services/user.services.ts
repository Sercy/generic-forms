import { TUser, UserSchema } from '../schemas'

export const createUser = async (values: Record<string, string>): Promise<TUser> => {
  const user = UserSchema.cast({
    value: {
      id: crypto.randomUUID(),
      ...values
    }
  })

  return user.value
}
