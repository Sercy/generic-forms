import { ComponentProps, useState } from "react"
import { CreateUserForm, List } from "../components"
import { TUser } from "../schemas"

export const UsersPage = () => {
  const [users, setUsers] = useState<Array<TUser>>([])

  const onCreate: ComponentProps<typeof CreateUserForm>['onCreate'] = (user) => setUsers(prevUsers => ([...prevUsers, user]))

  // const usersMapper = () => {
  //   debugger
  //   return users.map((user) => ([Object.entries(user)]))
  // }

  return (
    <>
      <CreateUserForm onCreate={onCreate} />
      <List data={users} />
    </>
  )
}
