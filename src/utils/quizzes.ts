// Quizzes API
import { http } from "./http";

export interface Quiz {
    id: number;
    title: string;
    content: {
        options: string[];
    };
    correct: number;
    difficulty?: string;
    category?: string;
    created_at?: string;
}

export async function getRandomQuizzes(course_id: number, user_id: number): Promise<Quiz[]> {
    return http.get<Quiz[]>(`/questions/${course_id}/${user_id}`);
}


// Submit quiz answer
export async function submitQuizAnswer(
    userId: number,
    quizId: number,
): Promise<{ is_correct: boolean }> {
    return http.post<{ is_correct: boolean }>(`/questions/${quizId}/answer/${userId}`);
}
