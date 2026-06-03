import { useEffect, useMemo, useRef, useState } from "react";

import { Send, Bot, User, Sparkles, Brain } from "lucide-react";

import { getChatMessages, sendChatMessage } from "../../services/chatService";
import type { ChatConversation } from "../../services/chatService";

interface Props {
  companion?: "amaris" | "kael";
}

type UiMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  createdAt?: string;
};

function conversationToMessages(conversation: ChatConversation): UiMessage[] {
  return [
    {
      id: `${conversation.id}-user`,
      role: "user",
      text: conversation.user_message,
      createdAt: conversation.created_at,
    },
    {
      id: `${conversation.id}-ai`,
      role: "ai",
      text: conversation.bot_response,
      createdAt: conversation.created_at,
    },
  ];
}

export default function AIChat({ companion = "amaris" }: Props) {
  const initialMessage =
    companion === "amaris"
      ? "Hola, soy AMARIS. Estoy aqui para acompanarte emocionalmente. El historial está cargando..."
      : "Hola, soy KAEL. Analizare tus emociones y patrones mentales. El historial está cargando...";

  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [pendingUserMessage, setPendingUserMessage] = useState<UiMessage | null>(null);
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = useMemo<UiMessage[]>(() => {
    const savedMessages = conversations.flatMap(conversationToMessages);

    if (pendingUserMessage) {
      return [...savedMessages, pendingUserMessage];
    }

    if (savedMessages.length === 0) {
      return [{ id: "initial", role: "ai", text: initialMessage }];
    }

    return savedMessages;
  }, [conversations, initialMessage, pendingUserMessage]);

  useEffect(() => {
    let alive = true;
    setLoadingMessages(true);
    setError(null);

    getChatMessages()
      .then((data) => {
        if (alive) setConversations(data);
      })
      .catch(() => {
        if (alive) setError("No se pudo cargar el historial del chat.");
      })
      .finally(() => {
        if (alive) setLoadingMessages(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || sendingMessage) return;

    setSendingMessage(true);
    setError(null);
    setPendingUserMessage({
      id: `pending-user-${Date.now()}`,
      role: "user",
      text: message,
    });
    setInput("");

    try {
      const createdConversation = await sendChatMessage({ message });
      setConversations((current) => [...current, createdConversation]);
      setPendingUserMessage(null);
    } catch {
      setInput(message);
      setPendingUserMessage(null);
      setError("No se pudo enviar el mensaje. Revisa tu sesion e intentalo otra vez.");
    } finally {
      setSendingMessage(false);
    }
  };

  const isAmaris = companion === "amaris";

  return (
    <div
      className="
        w-full
        h-[min(700px,calc(100dvh-220px))]
        min-h-[460px]
        md:h-[700px]
        flex
        flex-col
        rounded-[24px]
        sm:rounded-[35px]
        border
        border-[var(--theme-border)]
        overflow-hidden
        backdrop-blur-2xl
        bg-[var(--theme-card)]
      "
    >
      <div
        className="
          p-4
          sm:p-5
          border-b
          border-[var(--theme-border)]
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            w-12
            h-12
            sm:w-14
            sm:h-14
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-2xl
            bg-[image:var(--theme-button)]
          "
        >
          {isAmaris ? <Sparkles size={24} /> : <Brain size={24} />}
        </div>

        <div>
          <h2 className="text-white font-black text-lg sm:text-xl">
            {isAmaris ? "AMARIS AI" : "KAEL AI"}
          </h2>
          <p className="text-white/50 text-sm">
            {loadingMessages ? "Cargando historial..." : isAmaris ? "Asistente emocional activa" : "IA analitica avanzada"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--theme-hover)]">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`
                max-w-[86%]
                sm:max-w-[75%]
                px-4
                sm:px-5
                py-3
                sm:py-4
                rounded-[24px]
                text-sm
                lg:text-base
                leading-relaxed
                ${msg.role === "user" ? "bg-[image:var(--theme-button)] text-white" : "bg-white/10 text-white"}
              `}
            >
              {msg.text}
            </div>

            {msg.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {sendingMessage && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--theme-hover)]">
              <Bot size={18} />
            </div>
            <div className="max-w-[75%] px-5 py-4 rounded-[24px] text-sm bg-white/10 text-white/60">
              <span className="inline-flex items-center gap-1">
                Escribiendo
                <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div
        className="
          p-4
          sm:p-5
          border-t
          border-[var(--theme-border)]
          flex
          flex-col
          sm:flex-row
          gap-4
        "
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleSend();
            }
          }}
          placeholder="Escribe como te sientes..."
          disabled={sendingMessage}
          className="
            flex-1
            min-w-0
            px-4
            sm:px-5
            py-4
            rounded-2xl
            bg-white/5
            border
            border-[var(--theme-border)]
            text-white
            outline-none
            focus:border-[var(--theme-primary)]
            disabled:opacity-60
          "
        />

        <button
          onClick={() => void handleSend()}
          disabled={!input.trim() || sendingMessage}
          className="
            px-5
            py-4
            rounded-2xl
            flex
            items-center
            justify-center
            transition-all
            hover:scale-105
            disabled:opacity-50
            disabled:hover:scale-100
            bg-[image:var(--theme-button)]
          "
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
