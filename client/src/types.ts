export interface User {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Folder {
  id: string
  name: string
  created_at: string
  updated_at: string
  user: User
}

export interface Note {
  id: string
  title: string
  body: string
  priority: string
  created_at: string
  updated_at: string
  folder: Folder
  userRole: UserRole[]
  noteTag: NoteTag[]
}

export interface Favorite {
  id: string
  user: User
  note: Note
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  created_at: string
  updated_at: string
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
