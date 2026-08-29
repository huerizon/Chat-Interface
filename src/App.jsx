import { useState } from 'react'
import './index.css'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const initialMessages = [
  { id: 1, sender: 'bot', text: 'Hi! How can I help you today?', time: formatTime(new Date()) },
]

export default function App() {
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  function sendMessage(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: 'user', text, time: formatTime(new Date()) },
    ])
    setDraft('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text: `You said: "${text}"`,
          time: formatTime(new Date()),
        },
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
            <span className="chat-time">{m.time}</span>
          </div>
        ))}
        {isTyping && <div className="chat-message bot typing">Typing...</div>}
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
