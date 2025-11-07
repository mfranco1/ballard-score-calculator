/**
 * Google Analytics utility functions
 * Provides type-safe wrappers for GA4 event tracking
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Initialize Google Analytics
 * Call this once when the app loads
 */
export const initGA = (): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId || typeof window === 'undefined') {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  function gtag(...args: unknown[]): void {
    window.dataLayer?.push(args);
  }
  
  // Make gtag available globally
  window.gtag = gtag;

  // Load the GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Configure GA
  gtag('js', new Date());
  gtag('config', measurementId);
};

/**
 * Check if Google Analytics is initialized
 */
export const isGAEnabled = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    !!import.meta.env.VITE_GA_MEASUREMENT_ID
  );
};

/**
 * Track a page view
 */
export const trackPageView = (url: string): void => {
  if (!isGAEnabled()) return;

  window.gtag?.('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!isGAEnabled()) return;

  window.gtag?.('event', eventName, eventParams);
};

/**
 * Track specific app events
 */
export const analytics = {
  /**
   * Track when a score is selected
   */
  trackScoreSelection: (criterionId: string, score: number): void => {
    trackEvent('score_selected', {
      criterion_id: criterionId,
      score: score,
    });
  },

  /**
   * Track when gender is changed
   */
  trackGenderChange: (gender: 'male' | 'female'): void => {
    trackEvent('gender_changed', {
      gender: gender,
    });
  },

  /**
   * Track when calculation is completed
   */
  trackCalculationComplete: (
    totalScore: number,
    gestationalAge: number
  ): void => {
    trackEvent('calculation_complete', {
      total_score: totalScore,
      gestational_age: gestationalAge,
    });
  },

  /**
   * Track when results are reset
   */
  trackReset: (): void => {
    trackEvent('results_reset');
  },

  /**
   * Track when results are copied
   */
  trackCopyResults: (): void => {
    trackEvent('results_copied');
  },
};

