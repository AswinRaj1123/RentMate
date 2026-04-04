// API Configuration
// Priority: VITE_API_BASE_URL > local/LAN backend > deployed backend

const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

const isLocalOrLanHost =
	typeof window !== "undefined" &&
	(/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) ||
		/^192\.168\./.test(window.location.hostname) ||
		/^10\./.test(window.location.hostname) ||
		/^172\.(1[6-9]|2\d|3[0-1])\./.test(window.location.hostname));

export const API_BASE_URL = envBaseUrl
	? envBaseUrl
	: isLocalOrLanHost
	? `${window.location.protocol}//${window.location.hostname}:3000`
	: "https://rentmate-zyvb.onrender.com";
