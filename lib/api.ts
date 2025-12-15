const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      }

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`
      }

      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(error.error || `Request failed with status ${response.status}`)
      }

      return response.json()
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running.')
      }
      throw error
    }
  }

  // Auth
  async register(data: { email: string; password: string; name: string; healingTags: string[]; isAnonymous: boolean }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async requestPasswordReset(email: string) {
    return this.request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token: string, password: string) {
    return this.request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
  }

  // Users
  async getMe() {
    return this.request('/api/users/me')
  }

  async updateProfile(data: any) {
    return this.request('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Groups
  async getGroups() {
    return this.request('/api/groups')
  }

  async createGroup(data: any) {
    return this.request('/api/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateGroup(id: string, data: any) {
    return this.request(`/api/groups/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteGroup(id: string) {
    return this.request(`/api/groups/${id}`, {
      method: 'DELETE',
    })
  }

  async joinGroup(groupId: string) {
    return this.request(`/api/groups/${groupId}/join`, { method: 'POST' })
  }

  async getGroupPosts(groupId: string) {
    return this.request(`/api/groups/${groupId}/posts`)
  }

  async createPost(groupId: string, content: string) {
    return this.request(`/api/groups/${groupId}/posts`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  }

  // Messages
  async getConversations() {
    return this.request('/api/messages/conversations')
  }

  async getMessages(userId: string) {
    return this.request(`/api/messages/${userId}`)
  }

  async sendMessage(data: { content: string; recipientId?: string; groupId?: string }) {
    return this.request('/api/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Buddies
  async findBuddies() {
    return this.request('/api/buddies/find')
  }

  async sendBuddyRequest(receiverId: string) {
    return this.request('/api/buddies/request', {
      method: 'POST',
      body: JSON.stringify({ receiverId }),
    })
  }

  async getMyBuddies() {
    return this.request('/api/buddies/my-buddies')
  }

  // Resources
  async getResources(category?: string) {
    const query = category ? `?category=${category}` : ''
    return this.request(`/api/resources${query}`)
  }

  async createResource(data: { title: string; description: string; url: string; category: string; type: string }) {
    return this.request('/api/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateResource(id: string, data: any) {
    return this.request(`/api/resources/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteResource(id: string) {
    return this.request(`/api/resources/${id}`, {
      method: 'DELETE',
    })
  }

  // Video
  async createVideoRoom(roomName?: string, groupId?: string) {
    return this.request('/api/video/create-room', {
      method: 'POST',
      body: JSON.stringify({ roomName, groupId }),
    })
  }

  async getRoomToken(roomName: string) {
    return this.request('/api/video/room-token', {
      method: 'POST',
      body: JSON.stringify({ roomName }),
    })
  }

  // Admin
  async getAdminStats() {
    return this.request('/api/admin/stats')
  }

  async getUserGrowth() {
    return this.request('/api/admin/user-growth')
  }

  async getActivity() {
    return this.request('/api/admin/activity')
  }

  async getAdminUsers(page = 1, limit = 10, search = '', plan = 'all') {
    const query = new URLSearchParams({ 
      page: page.toString(), 
      limit: limit.toString(), 
      search, 
      plan 
    })
    return this.request(`/api/admin/users?${query}`)
  }

  async getTopCommunities() {
    return this.request('/api/admin/top-communities')
  }
}

export const api = new ApiClient()
