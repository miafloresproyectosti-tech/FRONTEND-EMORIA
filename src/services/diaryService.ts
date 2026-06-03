import { apiRequest } from "./apiClient";

export interface DiaryEntry {
  id: number | string;
  user_id?: number | string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateDiaryEntryRequest {
  content: string;
}

type DiaryListResponse = DiaryEntry[] | { data: DiaryEntry[] };
type DiaryItemResponse = DiaryEntry | { data: DiaryEntry };

function unwrapList(response: DiaryListResponse): DiaryEntry[] {
  return Array.isArray(response) ? response : response.data;
}

function unwrapItem(response: DiaryItemResponse): DiaryEntry {
  return "data" in response ? response.data : response;
}

export async function getDiaryEntries(): Promise<DiaryEntry[]> {
  const response = await apiRequest<DiaryListResponse>("/diary");
  return unwrapList(response);
}

export async function createDiaryEntry(payload: CreateDiaryEntryRequest): Promise<DiaryEntry> {
  const response = await apiRequest<DiaryItemResponse>("/diary", {
    method: "POST",
    body: payload,
  });

  return unwrapItem(response);
}

export async function getDiaryEntry(entryId: DiaryEntry["id"]): Promise<DiaryEntry> {
  const response = await apiRequest<DiaryItemResponse>(`/diary/${entryId}`);
  return unwrapItem(response);
}

export async function deleteDiaryEntry(entryId: DiaryEntry["id"]): Promise<void> {
  await apiRequest<unknown>(`/diary/${entryId}`, {
    method: "DELETE",
  });
}
