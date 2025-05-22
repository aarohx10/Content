import { NextResponse } from 'next/server';
import { aiService } from '@/lib/ai-service';
import type { PostType, PostIdea, PostContent, LeadMagnet, EmailContent } from '@/lib/api';

const PROMPTS = {
  postIdea: (postType: PostType, context?: string) => `You are an expert LinkedIn content strategist with deep knowledge of professional networking and content marketing. Your task is to create a compelling LinkedIn post idea that will drive engagement and establish thought leadership.

Post Type: ${postType}
${context ? `Additional Context: ${context}` : ''}

Requirements:
1. Title:
   - Must be attention-grabbing and professional
   - Should hint at the value proposition
   - Keep it under 100 characters
   - Use power words that drive curiosity

2. Description:
   - Write a 2-3 sentence overview
   - Clearly state the problem and solution
   - Include a hook that makes readers want to learn more
   - Keep it professional but conversational

3. Key Points (3-5):
   - Each point should be actionable and valuable
   - Include specific examples or data points
   - Focus on practical insights
   - Ensure points build on each other

4. Lead Magnet Suggestion:
   - Choose the most appropriate type based on the content
   - Consider the target audience's needs
   - Ensure it provides additional value
   - Make it relevant to the post topic

Format the response as a JSON object with this exact structure:
{
  "title": "string",
  "description": "string",
  "keyPoints": ["string"],
  "suggestedLeadMagnet": "guide" | "playbook" | "swipe-file" | "flow-chart" | "automation"
}

Remember to:
- Keep the tone professional but engaging
- Focus on providing real value
- Make it specific and actionable
- Ensure it's relevant to the target audience`,

  postContent: (idea: PostIdea, postType: PostType) => `You are a professional LinkedIn content creator with expertise in creating viral, engaging posts. Create a high-quality LinkedIn post based on this idea: ${JSON.stringify(idea)} for a ${postType} post.

Requirements:
1. Title:
   - Must be attention-grabbing
   - Include a hook or curiosity gap
   - Keep it under 100 characters
   - Use power words that drive engagement

2. Content Structure:
   - Start with a strong hook
   - Use short paragraphs (2-3 lines max)
   - Include emojis strategically
   - Add line breaks for readability
   - Use bullet points or numbers where appropriate
   - End with a clear call-to-action

3. Hashtags (3-5):
   - Mix of popular and niche hashtags
   - Relevant to the industry and topic
   - Include at least one trending hashtag
   - Keep them professional

4. Call-to-Action:
   - Clear and specific
   - Encourage engagement
   - Mention the lead magnet
   - Make it easy to follow

Format the response as a JSON object with this exact structure:
{
  "title": "string",
  "content": "string",
  "hashtags": ["string"],
  "callToAction": "string"
}

Remember to:
- Keep the tone professional but conversational
- Use storytelling techniques
- Include specific examples or data
- Make it scannable and easy to read
- Optimize for LinkedIn's algorithm`,

  leadMagnet: (postContent: PostContent, type: LeadMagnet["type"]) => `You are an expert content creator specializing in lead magnets and conversion optimization. Create a high-quality ${type} lead magnet based on this LinkedIn post: ${JSON.stringify(postContent)}.

Requirements:
1. Title:
   - Must be compelling and specific
   - Include a clear value proposition
   - Use power words that drive action
   - Keep it under 60 characters

2. Content Structure:
   - Start with a brief introduction
   - Break down complex information
   - Use clear headings and subheadings
   - Include practical examples
   - Add actionable steps
   - End with a clear next step

3. Thumbnail Description:
   - Describe a 1080x1350 image
   - Include key visual elements
   - Specify color scheme and style
   - Mention any text overlays
   - Focus on professional design

Format the response as a JSON object with this exact structure:
{
  "type": "${type}",
  "title": "string",
  "content": "string",
  "thumbnailDescription": "string"
}

Remember to:
- Make it immediately valuable
- Keep it professional and polished
- Include specific, actionable content
- Ensure it expands on the post's value
- Make it easy to consume and implement`,

  emailContent: (postContent: PostContent, leadMagnet: LeadMagnet) => `You are an expert email marketer specializing in promotional emails and conversion optimization. Create a high-converting email to promote this LinkedIn post and lead magnet: ${JSON.stringify({ post: postContent, leadMagnet })}.

Requirements:
1. Subject Line:
   - Must be attention-grabbing
   - Create curiosity or urgency
   - Keep it under 50 characters
   - Avoid spam triggers
   - Include a clear value proposition

2. Email Body:
   - Start with a compelling hook
   - Use short paragraphs
   - Include social proof
   - Highlight key benefits
   - Make it scannable
   - Use bullet points where appropriate
   - Include a clear value proposition

3. Call-to-Action:
   - Make it prominent
   - Use action-oriented language
   - Create urgency
   - Make it specific
   - Include a clear next step

Format the response as a JSON object with this exact structure:
{
  "subject": "string",
  "body": "string",
  "callToAction": "string"
}

Remember to:
- Keep the tone professional but personal
- Focus on value and benefits
- Make it easy to read
- Include clear next steps
- Optimize for email engagement`,

  chat: (message: string) => `You are an expert content creation assistant with deep knowledge of LinkedIn marketing, content strategy, and lead generation. Help the user with their request: ${message}

Guidelines:
1. Provide specific, actionable advice
2. Include relevant examples
3. Focus on practical solutions
4. Maintain a professional tone
5. Add value to their content creation process

Remember to:
- Be clear and concise
- Provide step-by-step guidance when needed
- Include best practices
- Reference industry standards
- Focus on measurable results`
};

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    switch (type) {
      case 'post-idea':
        const ideaResponse = await aiService.generateContent(PROMPTS.postIdea(data.postType, data.context));
        const idea = JSON.parse(ideaResponse) as PostIdea;
        return NextResponse.json(idea);

      case 'post-content':
        const contentResponse = await aiService.generateContent(PROMPTS.postContent(data.idea, data.postType));
        const content = JSON.parse(contentResponse) as PostContent;
        return NextResponse.json(content);

      case 'lead-magnet':
        const leadMagnetResponse = await aiService.generateContent(PROMPTS.leadMagnet(data.postContent, data.type));
        const leadMagnet = JSON.parse(leadMagnetResponse) as LeadMagnet;
        return NextResponse.json(leadMagnet);

      case 'email-content':
        const emailResponse = await aiService.generateContent(PROMPTS.emailContent(data.postContent, data.leadMagnet));
        const emailContent = JSON.parse(emailResponse) as EmailContent;
        return NextResponse.json(emailContent);

      case 'chat':
        const response = await aiService.generateContent(PROMPTS.chat(data.message));
        return NextResponse.json({ response });

      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 