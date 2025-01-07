import { useMemo } from "react";

export type SupportedPlatform = "youtube" | "instagram" | "tiktok" | null;

type URLPatternConfig = {
  readonly [K in Exclude<SupportedPlatform, null>]: RegExp;
};

const URL_PATTERNS: URLPatternConfig = {
  youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  instagram: /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/.+$/,
  tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+$/,
} as const;

interface ValidatorResult {
  readonly isValidUrl: boolean;
  readonly platform: SupportedPlatform;
}

export const useUrlValidator = (url: string): ValidatorResult => {
  const validationResult = useMemo((): ValidatorResult => {
    if (!url) {
      return {
        isValidUrl: false,
        platform: null,
      };
    }

    const [platform] = Object.entries(URL_PATTERNS).find(([, pattern]) =>
      pattern.test(url)
    ) ?? [null];

    return {
      isValidUrl: Boolean(platform),
      platform: platform as SupportedPlatform,
    };
  }, [url]);

  return validationResult;
};
