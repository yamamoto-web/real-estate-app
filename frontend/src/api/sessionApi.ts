import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/v1/session";

export async function startSession(): Promise<string> {
  const res = await axios.post<{ session_id: string }>(`${API_BASE}/start`);
  return res.data.session_id;
}

export interface QuestionResponse {
  answer: string;
  recommended_area: string;
}

export async function sendQuestion(
  sessionId: string,
  question: string
): Promise<QuestionResponse> {
  const res = await axios.post<QuestionResponse>(`${API_BASE}/question`, {
    session_id: sessionId,
    question: question,
  });
  return res.data;
}

export interface ResultResponse {
  final_answer: string;
  recommended_area: string;
}

export async function getResult(sessionId: string): Promise<ResultResponse> {
  const res = await axios.get<ResultResponse>(`${API_BASE}/result/${sessionId}`);
  return res.data;
}
