export type SupportedPlatform = "youtube" | "instagram" | "tiktok" | null;

const URL_PATTERNS = {
  youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
  instagram: /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/.+$/,
  tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+$/,
};

export const useUrlValidator = (url: string) => {
  const validateUrl = (): SupportedPlatform => {
    if (!url) return null;

    const platform = Object.entries(URL_PATTERNS).find(([, pattern]) =>
      pattern.test(url)
    );

    return platform ? (platform[0] as SupportedPlatform) : null;
  };

  return {
    isValidUrl: Boolean(validateUrl()),
    platform: validateUrl(),
  };
};
