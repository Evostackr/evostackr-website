export interface ExchangeRateData {
  rate: number; // USD per 1 INR (e.g. 0.0105)
  timestamp: number; // Unix timestamp in ms
  dateString: string; // Formatted date string from API
}

export interface CurrencyConversionState {
  basePriceInr: number;
  usdPrice: number | null;
  rate: number | null;
  rateDate: string | null;
  isLive: boolean;
  isCached: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

const CACHE_KEY = 'evostackr_inr_usd_exchange_rate';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export const BASE_INR_PRICE = 1245;

/**
 * Reads valid cached exchange rate from localStorage
 */
export function getCachedExchangeRate(): ExchangeRateData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ExchangeRateData;
    if (parsed && typeof parsed.rate === 'number' && parsed.rate > 0) {
      return parsed;
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

/**
 * Saves fetched exchange rate to localStorage
 */
function setCachedExchangeRate(data: ExchangeRateData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore localStorage quota errors
  }
}

/**
 * Fetches the current INR to USD exchange rate from reliable public endpoints.
 * Fallbacks to cached data if network request fails.
 */
export async function fetchInrToUsdRate(): Promise<CurrencyConversionState> {
  const cached = getCachedExchangeRate();
  const isCacheFresh = cached !== null && Date.now() - cached.timestamp < CACHE_TTL_MS;

  if (isCacheFresh && cached) {
    return {
      basePriceInr: BASE_INR_PRICE,
      usdPrice: Number((BASE_INR_PRICE * cached.rate).toFixed(2)),
      rate: cached.rate,
      rateDate: cached.dateString,
      isLive: false,
      isCached: true,
      isLoading: false,
      errorMessage: null,
    };
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/INR', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const usdRate = data?.rates?.USD;
      if (typeof usdRate === 'number' && usdRate > 0) {
        const rateData: ExchangeRateData = {
          rate: usdRate,
          timestamp: Date.now(),
          dateString: data.time_last_update_utc || new Date().toUTCString(),
        };
        setCachedExchangeRate(rateData);

        return {
          basePriceInr: BASE_INR_PRICE,
          usdPrice: Number((BASE_INR_PRICE * usdRate).toFixed(2)),
          rate: usdRate,
          rateDate: rateData.dateString,
          isLive: true,
          isCached: false,
          isLoading: false,
          errorMessage: null,
        };
      }
    }
  } catch {
    // Primary failed, attempt fallback
  }

  // Try backup endpoint: api.exchangerate-api.com
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/INR', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const usdRate = data?.rates?.USD;
      if (typeof usdRate === 'number' && usdRate > 0) {
        const rateData: ExchangeRateData = {
          rate: usdRate,
          timestamp: Date.now(),
          dateString: data.date ? new Date(data.date).toUTCString() : new Date().toUTCString(),
        };
        setCachedExchangeRate(rateData);

        return {
          basePriceInr: BASE_INR_PRICE,
          usdPrice: Number((BASE_INR_PRICE * usdRate).toFixed(2)),
          rate: usdRate,
          rateDate: rateData.dateString,
          isLive: true,
          isCached: false,
          isLoading: false,
          errorMessage: null,
        };
      }
    }
  } catch {
    // Backup failed
  }

  // Network failed: Check if we have previously cached rate
  if (cached) {
    return {
      basePriceInr: BASE_INR_PRICE,
      usdPrice: Number((BASE_INR_PRICE * cached.rate).toFixed(2)),
      rate: cached.rate,
      rateDate: cached.dateString,
      isLive: false,
      isCached: true,
      isLoading: false,
      errorMessage: null,
    };
  }

  // No network and no cached rate available
  return {
    basePriceInr: BASE_INR_PRICE,
    usdPrice: null,
    rate: null,
    rateDate: null,
    isLive: false,
    isCached: false,
    isLoading: false,
    errorMessage: 'USD conversion is temporarily unavailable',
  };
}

/**
 * Format currency amounts with proper locale and precision
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
