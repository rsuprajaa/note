export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface Folder {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface Note {
  id: string
  title: string
  body: string
  priority: string
  createdAt: string
  updatedAt: string
  folder: Folder
  userRole: UserRole[]
  tags: NoteTag[]
}

export interface Favorite {
  id: string
  user: User
  note: Note
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface UserRole {
  id: string
  permission: string
  resource: Note
  user: User
}

export interface NoteTag {
  id: string
  tag: Tag
  note: Note
}
