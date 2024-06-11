// URLS
export const API_URL = 'https://stringz-api.builders.garden';
// export const API_URL = 'http://localhost:3000';

export const ENDPOINT_SIGNER = `${API_URL}/farcaster/signer/`;
export const ENDPOINT_FEED = `${API_URL}/farcaster/feed/following?limit=10`;
export const ENDPOINT_PROFILE = `${API_URL}/farcaster/users`;
export const ENDPOINT_CAST = `${API_URL}/farcaster/casts`;
export const ENDPOINT_FAVORITE_CHANNELS = `${API_URL}/farcaster/channels/trending?interval=1d`;
export const ENDPOINT_TRENDING_CHANNELS = `${API_URL}/farcaster/channels/trending?interval=1d`;
export const ENDPOINT_MOST_FOLLOWED_CHANNELS = `${API_URL}/farcaster/channels/most-followed?limit=9`;
export const ENDPOINT_MOST_RECENT_CHANNELS = `${API_URL}/farcaster/channels/most-recently-created`;
export const ENDPOINT_TRENDING_CASTS = `${API_URL}/farcaster/casts/trending?timeFrame=one_hour&criteria=social_capital_value&limit=5`;
export const ENDPOINT_CHANNELS = `${API_URL}/farcaster/channels`;
export const ENDPOINT_NOTIFICATIONS = `${API_URL}/farcaster/notifications`;
export const ENDPOINT_SEARCH = `${API_URL}/farcaster/notifications?limit=10`;
