export type AIProvider = 'gemini';

export interface AIProviderConfig {
  name: AIProvider;
  apiKeys: string[];
  model: string;
  maxTokens: number;
  temperature: number;
  priority: number;
}

// Helper function to get API keys from environment
const getApiKeys = (baseKey: string): string[] => {
  const keys: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const key = process.env[`${baseKey}_${i}`] || process.env[baseKey];
    if (key) keys.push(key);
  }
  return keys;
};

export const AI_PROVIDERS: AIProviderConfig[] = [
  {
    name: 'gemini',
    apiKeys: getApiKeys('GOOGLE_API_KEY'),
    model: 'gemini-pro',
    maxTokens: 2000,
    temperature: 0.7,
    priority: 1,
  },
];

export const SORTED_PROVIDERS = [...AI_PROVIDERS];
export const DEFAULT_PROVIDER = SORTED_PROVIDERS[0]; 