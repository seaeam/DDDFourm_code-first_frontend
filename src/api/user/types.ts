export interface UserInfo {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
}

export type GetUserResponse = {
  data: UserInfo | undefined
  success: true
} | {
  error: string
  success: false
}

export interface RegisterResponse {
  data: UserInfo
  success: boolean
}

export type UpdateUserResponse =
  | {
    data: UserInfo
    success: true
  }
  | {
    error: string
    success: false
  }

export interface UserFormData {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export interface UserUpdateData {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
}
