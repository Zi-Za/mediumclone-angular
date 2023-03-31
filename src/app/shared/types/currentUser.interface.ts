export interface CurrentUserInterface {
  id: number
  createdAt: string
  updatedAt: string
  email: string
  username: string
  bio: string | null
  image: string | null
  token: string
}