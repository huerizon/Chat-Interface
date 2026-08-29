import { useState } from 'react'
import './index.css'

const initialMessages = [
  { id: 1, sender: 'bot', text: 'Hi! How can I help you today?' },
]

export default function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  function sendMessage(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'user', text }])
    setDraft('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, sender: 'bot', text: `You said: "${text}"` },
      ])
    }, 400)
  }

  return (
    <div className="chat-window">
      <header className="chat-header">Chat Interface</header>

      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`chat-message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
