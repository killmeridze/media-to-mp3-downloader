declare global {
  interface Window {
    api: {
      openDirectory: () => Promise<string[]>;
    };
  }
}

export {};
