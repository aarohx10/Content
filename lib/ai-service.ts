import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, AIProviderConfig, SORTED_PROVIDERS } from './config';

export class AIService {
  private providers: Map<AIProvider, any[]> = new Map();
  private failedKeys: Map<AIProvider, Set<string>> = new Map();
  private currentKeyIndex: Map<AIProvider, number> = new Map();

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    for (const provider of SORTED_PROVIDERS) {
      const clients = provider.apiKeys.map(key => new GoogleGenerativeAI(key));
      this.providers.set(provider.name, clients);
      this.failedKeys.set(provider.name, new Set());
      this.currentKeyIndex.set(provider.name, 0);
    }
  }

  private getNextKeyIndex(provider: AIProvider, totalKeys: number): number {
    const currentIndex = this.currentKeyIndex.get(provider) || 0;
    return (currentIndex + 1) % totalKeys;
  }

  private async generateWithProvider(
    provider: AIProvider,
    prompt: string,
    config: AIProviderConfig
  ): Promise<string> {
    const clients = this.providers.get(provider);
    if (!clients || clients.length === 0) {
      throw new Error(`No API keys available for provider ${provider}`);
    }

    const failedKeys = this.failedKeys.get(provider) || new Set();
    let attempts = 0;
    const maxAttempts = clients.length;

    while (attempts < maxAttempts) {
      const currentIndex = this.currentKeyIndex.get(provider) || 0;
      const client = clients[currentIndex];
      const apiKey = config.apiKeys[currentIndex];

      if (!failedKeys.has(apiKey)) {
        try {
          const model = client.getGenerativeModel({ model: config.model });
          const result = await model.generateContent(prompt);
          return result.response.text();
        } catch (error) {
          console.error(`Error with ${provider} key ${currentIndex + 1}:`, error);
          failedKeys.add(apiKey);
          
          // Try next key
          const nextIndex = this.getNextKeyIndex(provider, clients.length);
          this.currentKeyIndex.set(provider, nextIndex);
        }
      }
      attempts++;
    }

    throw new Error(`All API keys for ${provider} have failed`);
  }

  async generateContent(prompt: string): Promise<string> {
    const errors: Error[] = [];

    for (const provider of SORTED_PROVIDERS) {
      try {
        return await this.generateWithProvider(provider.name, prompt, provider);
      } catch (error) {
        errors.push(error as Error);
        continue;
      }
    }

    throw new Error(`All AI providers failed: ${errors.map(e => e.message).join(', ')}`);
  }

  resetFailedKeys() {
    for (const [provider, failedKeys] of this.failedKeys) {
      failedKeys.clear();
    }
  }

  getProviderStatus(): Record<AIProvider, { totalKeys: number; failedKeys: number }> {
    const status: Record<AIProvider, { totalKeys: number; failedKeys: number }> = {} as any;
    
    for (const provider of SORTED_PROVIDERS) {
      const failedKeys = this.failedKeys.get(provider.name) || new Set();
      status[provider.name] = {
        totalKeys: provider.apiKeys.length,
        failedKeys: failedKeys.size
      };
    }
    
    return status;
  }
}

// Create a singleton instance
export const aiService = new AIService(); 