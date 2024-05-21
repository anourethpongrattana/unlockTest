const API_URL = process.env.EXPO_PUBLIC_API_URL

export interface Artiste {
    id: string,
    premium: boolean,
    genre: string,
    popularite: number,
    name: string,
    url: string
}

export const getArtistes = async () => {
    const response = await fetch(`${API_URL}/artistes`)
    return response.json();
}