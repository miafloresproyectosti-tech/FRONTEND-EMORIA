import { apiRequest } from "./apiClient";

export interface ChatConversation {
  id: number | string;
  user_id?: number | string;
  user_message: string;
  bot_response: string;
  created_at?: string;
  updated_at?: string;
}

export interface SendChatMessageRequest {
  message: string;
}

type ChatListResponse = ChatConversation[] | { data: ChatConversation[] };
type ChatSendResponse = ChatConversation | { data: ChatConversation };

function unwrapList(response: ChatListResponse): ChatConversation[] {
  return Array.isArray(response) ? response : response.data;
}

function unwrapConversation(response: ChatSendResponse): ChatConversation {
  return "data" in response ? response.data : response;
}

export async function getChatMessages(): Promise<ChatConversation[]> {
  const response = await apiRequest<ChatListResponse>("/chat");
  return unwrapList(response);
}

export async function sendChatMessage(payload: SendChatMessageRequest): Promise<ChatConversation> {
  const response = await apiRequest<ChatSendResponse>("/chat", {
    method: "POST",
    body: {
      message: payload.message,
      user_message: payload.message,
    },
  });

  return unwrapConversation(response);
}
