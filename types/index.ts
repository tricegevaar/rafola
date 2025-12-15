export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAnonymous: boolean
  healingTags: string[]
  isPremium?: boolean
  bio?: string
  location?: string
  createdAt: Date
}

export interface Group {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  isPrivate: boolean
}

export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: Date
  groupId?: string
  recipientId?: string
}

export interface Buddy {
  id: string
  name: string
  avatar?: string
  healingTags: string[]
  matchScore: number
}

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  url: string
  type: 'article' | 'guide' | 'hotline' | 'video'
}
