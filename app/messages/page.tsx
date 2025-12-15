'use client'

import { useState, useEffect, useRef } from 'react'
import { api } from '@/lib/api'
import { socketClient } from '@/lib/socket'
import { Send } from 'lucide-react'
import Link from 'next/link'

export default function MessagesPage() {
  const [buddies, setBuddies] = useState<any[]>([])
  const [selectedBuddy, setSelectedBuddy] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadBuddies()
    
    socketClient.onNewMessage((message) => {
      setMessages(prev => [...prev, message])
    })
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadBuddies = async () => {
    try {
      const data = await api.getMyBuddies()
      setBuddies(data)
    } catch (error) {
      console.error('Failed to load buddies')
    }
  }

  const loadMessages = async (buddyId: string) => {
    try {
      const data = await api.getMessages(buddyId)
      setMessages(data)
    } catch (error) {
      console.error('Failed to load messages')
    }
  }

  const handleSelectBuddy = (buddy: any) => {
    setSelectedBuddy(buddy)
    loadMessages(buddy.id)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedBuddy) return

    socketClient.sendMessage({
      content: newMessage,
      recipientId: selectedBuddy.id,
    })

    setNewMessage('')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Buddies List */}
        <div className="w-80 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto">
            {buddies.map(buddy => (
              <button
                key={buddy.id}
                onClick={() => handleSelectBuddy(buddy)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition ${
                  selectedBuddy?.id === buddy.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  {buddy.name[0]}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{buddy.name}</div>
                  <div className="text-sm text-gray-500">
                    {buddy.healingTags[0]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedBuddy ? (
            <>
              <div className="bg-white p-4 border-b">
                <h3 className="font-semibold">{selectedBuddy.name}</h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.senderId === selectedBuddy.id ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === selectedBuddy.id
                          ? 'bg-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="bg-white p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a buddy to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
