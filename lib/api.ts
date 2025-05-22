import { Anthropic } from '@anthropic-ai/sdk';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type PostType = 'thought-leadership' | 'case-study' | 'how-to';
export type LeadMagnetType = 'guide' | 'playbook' | 'swipe-file' | 'flow-chart' | 'automation';

export interface PostIdea {
  title: string;
  description: string;
  keyPoints: string[];
  suggestedLeadMagnet: LeadMagnetType;
}

export interface PostContent {
  title: string;
  content: string;
  hashtags: string[];
  callToAction: string;
}

export interface LeadMagnet {
  type: LeadMagnetType;
  title: string;
  content: string;
  thumbnailDescription: string;
}

export interface EmailContent {
  subject: string;
  body: string;
  callToAction: string;
}

export async function generatePostIdea(
  postType: PostType,
  context?: string
): Promise<PostIdea> {
  try {
    const prompt = `Generate a LinkedIn post idea for a ${postType} post. ${
      context ? `Context: ${context}` : ''
    } Include a title, description, key points, and suggest the best type of lead magnet.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse and structure the response
    const content = response.content[0].text;
    // Add parsing logic here to structure the response

    return {
      title: '',
      description: '',
      keyPoints: [],
      suggestedLeadMagnet: 'guide',
    };
  } catch (error) {
    console.error('Error generating post idea:', error);
    throw new Error('Failed to generate post idea');
  }
}

export async function generatePostContent(
  idea: PostIdea,
  postType: PostType
): Promise<PostContent> {
  try {
    const prompt = `Generate a LinkedIn post based on this idea: ${JSON.stringify(
      idea
    )} for a ${postType} post. Include a title, content, relevant hashtags, and a call to action.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse and structure the response
    const content = response.content[0].text;
    // Add parsing logic here to structure the response

    return {
      title: '',
      content: '',
      hashtags: [],
      callToAction: '',
    };
  } catch (error) {
    console.error('Error generating post content:', error);
    throw new Error('Failed to generate post content');
  }
}

export async function generateLeadMagnet(
  postContent: PostContent,
  type: LeadMagnetType
): Promise<LeadMagnet> {
  try {
    const prompt = `Generate a ${type} lead magnet based on this LinkedIn post: ${JSON.stringify(
      postContent
    )}. Include a title, content, and a description for a 1080x1350 thumbnail.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse and structure the response
    const content = response.content[0].text;
    // Add parsing logic here to structure the response

    return {
      type,
      title: '',
      content: '',
      thumbnailDescription: '',
    };
  } catch (error) {
    console.error('Error generating lead magnet:', error);
    throw new Error('Failed to generate lead magnet');
  }
}

export async function generateEmailContent(
  postContent: PostContent,
  leadMagnet: LeadMagnet
): Promise<EmailContent> {
  try {
    const prompt = `Generate an email to promote this LinkedIn post and lead magnet: ${JSON.stringify(
      { post: postContent, leadMagnet }
    )}. Include a subject line, body, and call to action.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });

    // Parse and structure the response
    const content = response.content[0].text;
    // Add parsing logic here to structure the response

    return {
      subject: '',
      body: '',
      callToAction: '',
    };
  } catch (error) {
    console.error('Error generating email content:', error);
    throw new Error('Failed to generate email content');
  }
}

export async function chatWithAI(message: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: message }],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error in AI chat:', error);
    throw new Error('Failed to get AI response');
  }
} 