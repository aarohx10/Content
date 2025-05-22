# Content Platform Deployment Guide

## Prerequisites

1. **Google Cloud Setup**
   - Create a Google Cloud project
   - Enable the Gemini API
   - Create 5 API keys (1 primary + 4 fallbacks)
   - Note down all API keys

2. **Vercel Account**
   - Sign up for a Vercel account
   - Connect your GitHub repository

## Local Setup

1. **Environment Variables**
   Create a `.env.local` file in the root directory with:
   ```env
   GOOGLE_API_KEY=your_primary_key_here
   GOOGLE_API_KEY_1=your_fallback_key_1_here
   GOOGLE_API_KEY_2=your_fallback_key_2_here
   GOOGLE_API_KEY_3=your_fallback_key_3_here
   GOOGLE_API_KEY_4=your_fallback_key_4_here
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Test Locally**
   ```bash
   npm run dev
   ```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Vercel Deployment**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`
     - Install Command: `npm install`

3. **Environment Variables in Vercel**
   Add all environment variables from `.env.local`:
   - GOOGLE_API_KEY
   - GOOGLE_API_KEY_1
   - GOOGLE_API_KEY_2
   - GOOGLE_API_KEY_3
   - GOOGLE_API_KEY_4

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Verify deployment

## Post-Deployment

1. **Verify API Keys**
   - Test the application
   - Check if fallback system works
   - Monitor API usage

2. **Monitoring**
   - Set up Vercel Analytics
   - Monitor API usage in Google Cloud Console
   - Check error logs in Vercel

## Troubleshooting

1. **API Key Issues**
   - Verify all keys are correctly set in Vercel
   - Check Google Cloud Console for API quotas
   - Ensure API is enabled in Google Cloud

2. **Build Issues**
   - Check Vercel build logs
   - Verify Next.js configuration
   - Check for TypeScript errors

3. **Runtime Issues**
   - Check Vercel function logs
   - Verify environment variables
   - Test API endpoints

## Security Notes

1. **API Keys**
   - Never commit `.env.local` to Git
   - Rotate keys periodically
   - Monitor for unusual usage

2. **Environment Variables**
   - Keep them secure in Vercel
   - Don't expose in client-side code
   - Use proper access controls

## Support

For issues:
1. Check Vercel deployment logs
2. Review Google Cloud Console
3. Check application logs
4. Contact support if needed 