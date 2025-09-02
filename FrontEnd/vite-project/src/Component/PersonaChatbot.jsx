import React, { useState, useEffect, useRef, useMemo } from "react";
import { Send, MessageCircle } from "lucide-react";
import "./PersonaChatbot.css";
import TypingDots from "./TypingDots";
const PersonaChatbot = () => {
  const [currentPersona, setCurrentPersona] = useState("hitesh");
  const [messagesByPersona, setMessagesByPersona] = useState({
    hitesh: [],
    piyush: [],
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

 const personas = {
    
    hitesh: {
      name: "Hitesh Choudhary",
      code: "HC",
      icon: "Tea",
      info: "Chai aur Code • Practical Learning • Industry Focus",
      primary: "#FF6B35",
      secondary: "#F7931E",
      light: "#000 ",
      dark: "#000",
      accent: "#000",
      systemPrompt: `You are Hitesh Choudhary, a popular Indian programming instructor and YouTuber. Your characteristics:

SPEAKING STYLE:
- Use Hinglish (mix of Hindi and English) naturally
- Say "chai aur code" frequently
- Use phrases like "dekho bhai", "samjha na", "arre yaar", "bas itna hi"
- Be enthusiastic but humble
- Use analogies related to everyday Indian life
- Mention "production mein deploy karna hai" often

PERSONALITY:
- Very practical and industry-focused
- Emphasize real-world applications
- Slightly humorous and relatable
- Always encourage learning by doing
- Mention your courses and community
- Talk about making projects for portfolio

TECHNICAL STYLE:
- Explain complex things simply
- Always give practical examples
- Mention industry best practices
- Talk about what companies actually use
- Focus on building projects, not just theory

Remember to sound exactly like Hitesh - warm, encouraging, practical, and with that signature Hinglish style!`,
    },

    piyush: {
      name: "Piyush Garg",
      code: "PG",
      icon: "ZAP",
      info: "Modern React • Latest Tech • High Energy Content",
      primary: "#6366F1",
      secondary: "#8B5CF6",
      light: "#000",
      dark: "#312E81",
      accent: "#E0E7FF",
      systemPrompt: `You are Piyush Garg, a popular Indian tech YouTuber and developer. Your characteristics:

SPEAKING STYLE:
- Very energetic and fast-paced
- Use modern slang and tech buzzwords
- Mix Hindi and English casually
- Use phrases like "bhai log", "literally", "bohot cool hai", "trust me bhai"
- Get excited about new technologies
- Use emojis conceptually in speech (say "fire" instead of using emoji)

PERSONALITY:
- Extremely enthusiastic about new tech
- Always talk about latest trends
- Mention React, Next.js, and modern tools frequently
- Very confident and opinionated
- Love discussing startups and tech industry
- Often say things are "game-changing" or "revolutionary"

TECHNICAL STYLE:
- Focus on modern JavaScript and React ecosystem
- Always mention latest features and updates
- Talk about performance and optimization
- Discuss industry trends and what's hot
- Mention startup tech stacks
- Very opinionated about best practices

Sound exactly like Piyush - energetic, modern, trend-focused, and with that signature excitement about new technology!`,
    },
  };

  const currentMessages = useMemo(
    () => messagesByPersona[currentPersona] || [],
    [messagesByPersona, currentPersona]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isTyping]);

  const switchPersona = (persona) => {
    if (isTyping) return;
    setCurrentPersona(persona);
  };

  const callOpenAI = async (message) => {
    const persona = personas[currentPersona];

    const response = await fetch("https://persona-ai-chattingbot.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        persona: persona.systemPrompt,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "API request failed");
    }

    const data = await response.json();
    return data.reply;
  };

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (!message || isTyping) return;

    const userMessage = { id: Date.now(), content: message, type: "user" };
    setMessagesByPersona((prev) => ({
      ...prev,
      [currentPersona]: [...(prev[currentPersona] || []), userMessage],
    }));
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await callOpenAI(message);
      const botMessage = { id: Date.now() + 1, content: response, type: "bot" };
      setMessagesByPersona((prev) => ({
        ...prev,
        [currentPersona]: [...(prev[currentPersona] || []), botMessage],
      }));
    } catch (error) {
      setMessagesByPersona((prev) => ({
        ...prev,
        [currentPersona]: [
          ...(prev[currentPersona] || []),
          {
            id: Date.now() + 1,
            content: `Error: ${error.message}`,
            type: "bot",
            isError: true,
          },
        ],
      }));
    } finally {
      setIsTyping(false);
     
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const currentPersona_ = personas[currentPersona];

  return (
    <div className="chat-root" style={{ "--accent": currentPersona_.primary }}>
      <div className="chat-container">
        <aside className="sidebar">
          <div className="sidebar-header">
            <span className="brand">Mentors</span>
          </div>
          <div className="persona-list">
            {Object.entries(personas).map(([key, persona]) => {
              const isActive = currentPersona === key;
              return (
                <button
                  key={key}
                  className={`persona-button${isActive ? " active" : ""}`}
                  onClick={() => switchPersona(key)}
                  disabled={isTyping}
                >
                  <div className="persona-avatar persona-code" aria-hidden>{persona.code || persona.name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()}</div>
                  <div className="persona-meta">
                    <div className="persona-name">{persona.name}</div>
                    <div className="persona-info">{persona.info}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="chat-pane">
          <header className="chat-header">
            <div className="header-meta">
              <div className="header-title">{currentPersona_.name}</div>
              <div className="header-subtitle">{currentPersona_.info}</div>
            </div>
          </header>

          <section className="messages">
            {currentMessages.length === 0 ? (
              <div className="empty-state" style={{color:"#FFFFFF",textWrap:"wrap"}}>
                <div className="empty-icon"><MessageCircle size={40} /></div>
                <div className="empty-title">Chat with {currentPersona_.name}</div>
                <div className="empty-subtitle" style={{textWrap:"wrap"}}>Ask about coding, technology, or career advice.</div>
              </div>
            ) : (
              <>
                {currentMessages.map((message) => {
                  const isUser = message.type === "user";
                  return (
                    <div key={message.id} className={`message-row ${isUser ? "user" : "bot"}`}>
                      {isUser ? (
                        <>
                          <div className={`bubble user`}>{message.content}</div>
                          <div className="message-avatar you">Y</div>
                        </>
                      ) : (
                        <>
                          <div className="message-avatar">{currentPersona_.name.charAt(0)}</div>
                          <div className={`bubble ${message.isError ? "error" : "bot"}`}>{message.content}</div>
                        </>
                      )}
                    </div>
                  );
                })}
                {isTyping && 
                
                <TypingDots></TypingDots>
                }
                <div ref={messagesEndRef} />
              </>
            )}
            <footer className="input-bar">
            <textarea
              className="input-textarea"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask ${currentPersona_.name} anything…`}
              rows="2"
              disabled={isTyping}
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </footer>
          </section>

        
        </main>
      </div>
    </div>
  );
};

export default PersonaChatbot;
