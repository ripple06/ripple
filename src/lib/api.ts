// API 클라이언트
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SeaEmotionResponse {
  emotion: string;
  name: string;
  message?: string;
}

export interface PathPoint {
  lat: number;
  lng: number;
  name?: string;
  description?: string;
  image?: string;  // 이미지 URL
}

export interface Course {
  courseId: number;
  name: string;
  totalDistance: number;
  color: string;
  paths: PathPoint[];  // 경로 포인트 배열
  reason?: string;  // 추천 이유
  description?: string;  // 코스 설명
  duration?: string;  // 예상 소요 시간
  highlights?: string[];  // 하이라이트
}

export interface CourseListResponse {
  courses: Course[];
}

export interface MbtiResponse {
  mbti: string;
}

export const api = {
  // 바다의 기분 분석
  seaemotion: {
    get: async (location: string): Promise<SeaEmotionResponse> => {
      const response = await fetch(`${API_URL}/api/seaemotion?location=${encodeURIComponent(location)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'API 요청 실패' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  },
  
  // MBTI 조회
  mbti: {
    get: async (userId: number = 1): Promise<MbtiResponse> => {
      const response = await fetch(`${API_URL}/api/mbti/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // MBTI가 없을 수도 있으므로 에러를 던지지 않고 null 반환
        if (response.status === 404) {
          return { mbti: '' };
        }
        const error = await response.json().catch(() => ({ detail: 'MBTI 조회 실패' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    
    // MBTI 저장
    save: async (userId: number, mbti: string): Promise<{ message: string }> => {
      const response = await fetch(`${API_URL}/api/mbti/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mbti }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'MBTI 저장 실패' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  },
  
  // 코스 추천
  courses: {
    // DB에서 코스 가져오기
    get: async (userId?: number): Promise<CourseListResponse> => {
      // user_id가 없으면 기본값 1 사용 (임시)
      const userIdParam = userId || 1;
      const response = await fetch(`${API_URL}/courses?user_id=${userIdParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'API 요청 실패' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    
    // AI로 코스 추천 생성
    aiRecommend: async (params: {
      location: string;
      seaEmotion: { emotion: string; name: string };
      mbti?: string;
      ecosystemData?: any;
      userPreferences?: any;
      limit?: number;
    }): Promise<CourseListResponse> => {
      console.log('🚀 AI 코스 추천 API 호출 시작:', {
        location: params.location,
        seaEmotion: params.seaEmotion,
        mbti: params.mbti,
        userPreferences: params.userPreferences,
        limit: params.limit
      });

      const response = await fetch(`${API_URL}/api/courses/ai-recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: params.location,
          sea_emotion: params.seaEmotion,
          mbti: params.mbti,
          ecosystem_data: params.ecosystemData,
          user_preferences: params.userPreferences,
          limit: params.limit || 1, // 기본값 1
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'API 요청 실패' }));
        console.error('❌ AI 코스 추천 API 오류:', error);
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ AI 코스 추천 API 응답:', data);
      
      // 백엔드 응답을 그대로 사용 (paths만 사용)
      const transformedCourses = data.courses.map((course: any) => {
        return {
          courseId: course.courseId,
          name: course.name,
          totalDistance: course.totalDistance,
          color: course.color,
          paths: course.paths || [],  // paths 배열 그대로 사용
          reason: course.reason,
          description: course.description,
          duration: course.duration,
          highlights: course.highlights,
        };
      });

      return { courses: transformedCourses };
    },
  },
};