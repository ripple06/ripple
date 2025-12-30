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

// 더미 퀴즈 데이터
const DUMMY_QUIZZES: Quiz[] = [
    { id: 1, title: '부산 연안에서 자주 대량 발생하는 생물은?', content: { options: ['불가사리', '해파리', '고래', '산호'] }, correct: 1 }, // SQL: 2
    { id: 2, title: '부산 앞바다에 영향을 주는 난류는?', content: { options: ['캘리포니아 해류', '쿠로시오 해류', '페루 해류', '벵겔라 해류'] }, correct: 1 }, // SQL: 2
    { id: 3, title: '부산 연안의 대표 어종은?', content: { options: ['연어', '명태', '멸치', '피라루쿠'] }, correct: 2 }, // SQL: 3
    { id: 4, title: '해양 생태계의 1차 생산자는?', content: { options: ['어류', '플랑크톤', '포유류', '패류'] }, correct: 1 },
    { id: 5, title: '부산 바다에서 미역이 자라는 환경은?', content: { options: ['담수', '암반', '모래사막', '심해'] }, correct: 1 },
    { id: 6, title: '해양 쓰레기 중 가장 많은 비중은?', content: { options: ['유리', '금속', '플라스틱', '종이'] }, correct: 2 },
    { id: 7, title: '부산 연안 양식이 활발한 생물은?', content: { options: ['상어', '굴', '고래', '해마'] }, correct: 1 },
    { id: 8, title: '적조의 주원인은?', content: { options: ['해류 감소', '플랑크톤 과다', '수온 하강', '염분 감소'] }, correct: 1 },
    { id: 9, title: '부산 앞바다의 계절별 수온 변화 원인은?', content: { options: ['조석', '계절풍', '화산 활동', '빙하'] }, correct: 1 },
    { id: 10, title: '해양 생물 다양성 보전의 목적은?', content: { options: ['개발 확대', '생태계 안정', '어획량 감소', '관광 제한'] }, correct: 1 },
    { id: 11, title: '연안 생태계 파괴의 원인은?', content: { options: ['자연 정화', '매립', '산란', '광합성'] }, correct: 1 },
    { id: 12, title: '부산 해역에서 볼 수 있는 포유류는?', content: { options: ['돌고래', '북극곰', '낙타', '코끼리'] }, correct: 0 },
    { id: 13, title: '해조류의 광합성 결과는?', content: { options: ['이산화탄소 증가', '산소 방출', '염분 상승', '독소 생성'] }, correct: 1 },
    { id: 14, title: '조간대 생물의 특징은?', content: { options: ['항상 물속', '환경 변화 적응', '심해 서식', '이동 불가'] }, correct: 1 },
    { id: 15, title: '부산 연안 조간대에서 볼 수 있는 생물은?', content: { options: ['산호', '소라', '해파리', '고래'] }, correct: 1 },
    { id: 16, title: '해양 보호 구역의 목적은?', content: { options: ['어획 증가', '생물 보호', '수질 악화', '개발 촉진'] }, correct: 1 },
    { id: 17, title: '해양 생태계 먹이그물의 특징은?', content: { options: ['단순', '복잡', '일방적', '고정'] }, correct: 1 },
    { id: 18, title: '부산 항만 활동의 영향으로 맞는 것은?', content: { options: ['생물 증가만 발생', '수질 오염 가능성', '염분 감소 없음', '생태계 무관'] }, correct: 1 },
    { id: 19, title: '기후 변화로 인한 부산 바다 변화는?', content: { options: ['수온 상승', '빙하 형성', '해수면 하강', '염분 고정'] }, correct: 0 },
    { id: 20, title: '플랑크톤 증가의 부정적 결과는?', content: { options: ['어류 증가', '적조 발생', '수질 개선', '산소 증가'] }, correct: 1 },
    { id: 21, title: '부산 연안 암반 지역의 장점은?', content: { options: ['생물 다양성 낮음', '해조류 부착 용이', '산소 부족', '생물 서식 불가'] }, correct: 1 },
    { id: 22, title: '해양 생태계에서 분해자의 역할은?', content: { options: ['생산', '소비', '유기물 분해', '포식'] }, correct: 2 },
    { id: 23, title: '부산 앞바다의 주요 어업 형태는?', content: { options: ['사냥', '연안 어업', '농업', '목축'] }, correct: 1 },
    { id: 24, title: '바다 사막화의 원인은?', content: { options: ['해조류 증가', '갯녹음', '산호 확산', '수온 안정'] }, correct: 1 },
    { id: 25, title: '갯녹음 현상의 결과는?', content: { options: ['서식지 증가', '생물 감소', '수질 개선', '어종 다양화'] }, correct: 1 },
    { id: 26, title: '부산 바다에서 해저 지형이 중요한 이유는?', content: { options: ['관광만 관련', '서식 환경 결정', '수온 고정', '염분 제거'] }, correct: 1 },
    { id: 27, title: '해양 생태계 복원의 예는?', content: { options: ['매립 확대', '인공 어초 설치', '쓰레기 투기', '남획'] }, correct: 1 },
    { id: 28, title: '부산 연안 수질 관리의 필요성은?', content: { options: ['생물 보호', '선박 증가', '염분 상승', '조류 제거'] }, correct: 0 },
    { id: 29, title: '해양 생물 남획의 문제점은?', content: { options: ['개체 수 감소', '생물 증가', '먹이 안정', '생태계 강화'] }, correct: 0 },
    { id: 30, title: '지속 가능한 어업이란?', content: { options: ['많이 잡기', '미래 고려 어획', '불법 어업', '보호종 포획'] }, correct: 1 },
    { id: 31, title: '부산 연안의 대표 패류는?', content: { options: ['홍합', '낙타조개', '민물조개', '진주조개'] }, correct: 0 },
    { id: 32, title: '해양 생물 이동의 주요 원인은?', content: { options: ['염분 변화', '수온·먹이', '화산', '달 거리'] }, correct: 1 },
    { id: 33, title: '바닷물의 순환을 일으키는 요인은?', content: { options: ['바람', '지진', '태양 폭발', '화산재'] }, correct: 0 },
    { id: 34, title: '부산 연안에서 조류가 중요한 이유는?', content: { options: ['생물 이동', '수질 정화', '영양염 이동', '모두 해당'] }, correct: 3 },
    { id: 35, title: '해양 생태계에서 상위 포식자의 역할은?', content: { options: ['개체 수 조절', '생산', '분해', '광합성'] }, correct: 0 },
    { id: 36, title: '해양 쓰레기가 생물에 미치는 영향은?', content: { options: ['서식지 제공', '얽힘·섭식 문제', '번식 촉진', '성장 가속'] }, correct: 1 },
    { id: 37, title: '부산 앞바다의 수심이 얕은 이유는?', content: { options: ['대륙붕 위치', '화산 폭발', '빙하 침식', '운석 충돌'] }, correct: 0 },
    { id: 38, title: '대륙붕의 특징은?', content: { options: ['생물 풍부', '매우 깊음', '생물 없음', '고온'] }, correct: 0 },
    { id: 39, title: '해양 생물 보호를 위한 개인 실천은?', content: { options: ['쓰레기 줄이기', '불법 채집', '산호 훼손', '남획'] }, correct: 0 },
    { id: 40, title: '해양 생태계 균형이 깨지면?', content: { options: ['안정 유지', '연쇄적 영향', '변화 없음', '생물 증가만'] }, correct: 1 },
    { id: 41, title: '부산 연안 모래 해저의 특징은?', content: { options: ['해조류 풍부', '저서생물 서식', '생물 없음', '암반만 존재'] }, correct: 1 },
    { id: 42, title: '저서생물이란?', content: { options: ['공중 생물', '바다 바닥 생물', '육상 생물', '담수 생물'] }, correct: 1 },
    { id: 43, title: '해양 생태계 조사에 사용되는 도구는?', content: { options: ['현미경', '낚싯대', '삽', '망치'] }, correct: 0 },
    { id: 44, title: '해수면 상승의 원인은?', content: { options: ['빙하 감소', '조석 증가', '화산 폭발', '염분 증가'] }, correct: 0 },
    { id: 45, title: '부산 연안 침식의 원인은?', content: { options: ['파랑', '광합성', '산란', '먹이 활동'] }, correct: 0 },
    { id: 46, title: '해양 생물 보호법의 목적은?', content: { options: ['개발 촉진', '생물 보전', '어획 자유', '규제 제거'] }, correct: 1 },
    { id: 47, title: '부산 연안의 대표 갑각류는?', content: { options: ['새우', '거북', '문어', '해파리'] }, correct: 0 },
    { id: 48, title: '해양 생물 다양성이 높은 이유는?', content: { options: ['환경 다양', '수온 고정', '염분 일정', '먹이 단순'] }, correct: 0 },
    { id: 49, title: '부산 바다에서 관찰 가능한 조류는?', content: { options: ['펭귄', '갈매기', '타조', '앵무새'] }, correct: 1 },
    { id: 50, title: '해양 생태계 교육의 목적은?', content: { options: ['인식 개선', '남획 장려', '오염 증가', '개발 확대'] }, correct: 0 },
    { id: 51, title: '연안 습지의 역할은?', content: { options: ['생물 산란장', '쓰레기장', '주거지', '공장 부지'] }, correct: 0 },
    { id: 52, title: '부산 연안 습지 훼손의 문제는?', content: { options: ['생물 감소', '수질 개선', '어획 증가', '생태 안정'] }, correct: 0 },
    { id: 53, title: '해양 생물의 적응 예는?', content: { options: ['보호색', '화장', '옷 착용', '도구 사용'] }, correct: 0 },
    { id: 54, title: '부산 앞바다에서 심해 생물이 적은 이유는?', content: { options: ['수심 얕음', '수온 높음', '염분 낮음', '먹이 과다'] }, correct: 0 },
    { id: 55, title: '해양 생태계에서 에너지 흐름 방향은?', content: { options: ['생산자→소비자', '소비자→생산자', '분해자→태양', '무작위'] }, correct: 0 },
    { id: 56, title: '해양 생물 조사 시 필요한 태도는?', content: { options: ['보호 중심', '무분별 채집', '서식지 파괴', '소음 유발'] }, correct: 0 },
    { id: 57, title: '부산 바다에서 어업 규제가 필요한 이유는?', content: { options: ['자원 고갈 방지', '어획량 감소', '비용 증가', '관광 축소'] }, correct: 0 },
    { id: 58, title: '해양 생태계의 회복력이란?', content: { options: ['변화 저항 능력', '완전 고정', '복구 불가', '변화 없음'] }, correct: 0 },
    { id: 59, title: '해양 오염의 육상 기원 예는?', content: { options: ['하수 유입', '심해 화산', '해저 분출', '조류'] }, correct: 0 },
    { id: 60, title: '부산 연안 관리의 궁극적 목표는?', content: { options: ['지속 가능성', '단기 이익', '개발 극대화', '생물 제거'] }, correct: 0 },
    { id: 61, title: '해양 생태계와 인간의 관계는?', content: { options: ['상호 의존', '무관', '경쟁만', '일방적'] }, correct: 0 },
    { id: 62, title: '부산 바다 생물 관찰 시 지켜야 할 것은?', content: { options: ['거리 유지', '직접 접촉', '채집', '추적'] }, correct: 0 },
    { id: 63, title: '해양 생태계 서비스에 포함되는 것은?', content: { options: ['어업 자원', '오염', '침식', '재해'] }, correct: 0 },
    { id: 64, title: '부산 연안에서 인공 어초의 역할은?', content: { options: ['서식지 제공', '수온 상승', '오염 증가', '항로 방해'] }, correct: 0 },
    { id: 65, title: '해양 생태계 보전이 중요한 이유는?', content: { options: ['미래 세대', '단기 이익', '개발 가속', '규제 완화'] }, correct: 0 },
    { id: 66, title: '바다 생물의 번식 장소로 중요한 곳은?', content: { options: ['연안', '사막', '빙하', '산악'] }, correct: 0 },
    { id: 67, title: '부산 연안 수질 악화의 지표는?', content: { options: ['용존산소 감소', '생물 증가', '투명도 증가', '냄새 감소'] }, correct: 0 },
    { id: 68, title: '해양 생태계 연구의 목적은?', content: { options: ['이해와 보전', '이용 극대화', '생물 제거', '개발 촉진'] }, correct: 0 },
    { id: 69, title: '해양 생물 보호종 지정 이유는?', content: { options: ['개체 수 감소', '흔함', '해로움', '무관'] }, correct: 0 },
    { id: 70, title: '부산 바다 생태계 변화 관측 방법은?', content: { options: ['장기 모니터링', '추측', '단기 관찰', '무작위 조사'] }, correct: 0 },
    { id: 71, title: '해양 생태계에서 인간 활동 영향은?', content: { options: ['큼', '없음', '미미', '일정'] }, correct: 0 },
    { id: 72, title: '부산 연안에서 생태 관광 시 유의점은?', content: { options: ['환경 존중', '채집', '소음', '오염'] }, correct: 0 },
    { id: 73, title: '해양 생태계의 안정 조건은?', content: { options: ['균형 유지', '단일종 우세', '남획', '오염'] }, correct: 0 },
    { id: 74, title: '부산 바다의 생물 계절 변화 원인은?', content: { options: ['수온', '달 거리', '지진', '화산'] }, correct: 0 },
    { id: 75, title: '해양 생태계 보호 정책의 핵심은?', content: { options: ['예방', '사후 처리', '무대응', '방치'] }, correct: 0 },
    { id: 76, title: '부산 연안의 자연 정화 기능을 하는 것은?', content: { options: ['습지', '매립지', '콘크리트', '도로'] }, correct: 0 },
    { id: 77, title: '해양 생물 다양성 감소의 위험은?', content: { options: ['생태 불안', '안정 강화', '변화 없음', '자원 증가'] }, correct: 0 },
    { id: 78, title: '해양 생태계와 기후의 관계는?', content: { options: ['상호 영향', '무관', '단방향', '고정'] }, correct: 0 },
    { id: 79, title: '부산 바다 보전을 위한 시민 참여 예는?', content: { options: ['해변 정화', '쓰레기 투기', '불법 어업', '훼손'] }, correct: 0 },
    { id: 80, title: '해양 생태계의 장기 보전 전략은?', content: { options: ['통합 관리', '부분 대응', '무대책', '개발 우선'] }, correct: 0 },
    { id: 81, title: '해양 생물 연구 윤리로 옳은 것은?', content: { options: ['생명 존중', '무분별 실험', '서식지 파괴', '남획'] }, correct: 0 },
    { id: 82, title: '부산 연안에서 관찰되는 해양 무척추동물은?', content: { options: ['문어', '고양이', '도마뱀', '개구리'] }, correct: 0 },
    { id: 83, title: '해양 생태계에서 영양 단계란?', content: { options: ['먹이 위치', '서식 깊이', '이동 거리', '크기'] }, correct: 0 },
    { id: 84, title: '부산 앞바다의 어종 다양성 원인은?', content: { options: ['해류 교차', '사막 인접', '빙하 영향', '화산 활동'] }, correct: 0 },
    { id: 85, title: '해양 생태계 파괴의 장기적 결과는?', content: { options: ['회복 어려움', '즉시 복구', '영향 없음', '생물 증가'] }, correct: 0 },
    { id: 86, title: '해양 생물 보호 교육의 대상은?', content: { options: ['모두', '연구자만', '어민만', '학생 제외'] }, correct: 0 },
    { id: 87, title: '부산 연안에서 생태계 복원 사례는?', content: { options: ['잘피숲 조성', '매립 확대', '콘크리트화', '남획'] }, correct: 0 },
    { id: 88, title: '해양 생태계 건강성 지표는?', content: { options: ['종 다양성', '쓰레기 양', '소음', '선박 수'] }, correct: 0 },
    { id: 89, title: '해양 생물의 멸종 위험 요인은?', content: { options: ['서식지 파괴', '보호 활동', '규제', '복원'] }, correct: 0 },
    { id: 90, title: '부산 바다 생태계 관리의 기본 원칙은?', content: { options: ['예방적 관리', '사후 대응', '무관리', '개발 우선'] }, correct: 0 },
    { id: 91, title: '해양 생태계와 경제의 관계는?', content: { options: ['연관 있음', '무관', '반대', '독립'] }, correct: 0 },
    { id: 92, title: '부산 연안 생태계 조사 시 고려 요소는?', content: { options: ['물리·화학·생물', '생물만', '화학만', '무작위'] }, correct: 0 },
    { id: 93, title: '해양 생물 보호를 위한 국제적 노력은?', content: { options: ['협약 체결', '무시', '경쟁', '남획'] }, correct: 0 },
    { id: 94, title: '부산 바다의 미래를 위해 필요한 것은?', content: { options: ['지속적 관리', '단기 개발', '방치', '오염 허용'] }, correct: 0 },
    { id: 95, title: '해양 생태계의 핵심 가치는?', content: { options: ['생명 유지', '자원 소모', '개발 부지', '폐기 공간'] }, correct: 0 },
    { id: 96, title: '해양 생물 서식지 보전의 이유는?', content: { options: ['번식 유지', '관광 제한', '비용 증가', '접근 차단'] }, correct: 0 },
    { id: 97, title: '부산 연안 생태계 변화의 감시 주체는?', content: { options: ['정부·시민', '개인 혼자', '외국만', '무관'] }, correct: 0 },
    { id: 98, title: '해양 생태계의 회복을 돕는 행동은?', content: { options: ['오염 감소', '남획', '매립', '훼손'] }, correct: 0 },
    { id: 99, title: '해양 생물 보호가 인간에게 주는 이익은?', content: { options: ['자원 지속', '즉각 이익 감소', '불편만', '무관'] }, correct: 0 },
    { id: 100, title: '부산 해양 생태계 보전의 최종 목표는?', content: { options: ['인간·자연 공존', '자연 제거', '개발 극대화', '이용 중단'] }, correct: 0 },
];

// 배열 랜덤 선택
function getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// 옵션 섞고 correct 인덱스 갱신
function shuffleQuizOptions(quiz: Quiz): Quiz {
    const options = [...quiz.content.options];
    const correctAnswer = options[quiz.correct]; // 원래 정답
    const shuffled = options.sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffled.findIndex(o => o === correctAnswer);

    return {
        ...quiz,
        content: { options: shuffled },
        correct: newCorrectIndex,
    };
}

// 랜덤 퀴즈 가져오기
export async function getRandomQuizzes(count: number = 5): Promise<Quiz[]> {
    const selected = getRandomItems(DUMMY_QUIZZES, count);
    return selected.map(shuffleQuizOptions);
}

// 정답 제출
export async function submitQuizAnswer(
    userId: number,
    quizId: number,
): Promise<{ is_correct: boolean }> {
    return http.post<{ is_correct: boolean }>(`/questions/${quizId}/answer/${userId}`);
}
