const TOUR_API_BASE_URL = "http://apis.data.go.kr/B551011/KorService1/locationBasedList1";

export interface Attraction {
    contentid: string;
    contenttypeid: string;
    title: string;
    addr1: string;
    mapx: string;
    mapy: string;
    firstimage?: string;
}

export const fetchNearbyAttractions = async (lat: number, lng: number, radius: number = 2000): Promise<Attraction[]> => {
    const params = new URLSearchParams({
        mapX: lng.toString(),
        mapY: lat.toString(),
        radius: radius.toString(),
    });

    try {
        const response = await fetch(`/api/tourism?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const items = data.response?.body?.items?.item;

        if (!items) return [];

        return Array.isArray(items) ? items : [items];
    } catch (error) {
        console.error("Error fetching attractions:", error);
        return [];
    }
};