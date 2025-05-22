# Content Platform

A powerful content generation platform for LinkedIn posts and YouTube videos, built with Next.js and Gemini AI.

## Features

- LinkedIn post generation with AI assistance
- Lead magnet creation
- Email content generation
- Multiple AI provider support with fallback
- Modern, responsive UI
- Real-time content editing
- AI chat assistance

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Gemini AI API
- Vercel Deployment

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd content-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   GOOGLE_API_KEY=your_primary_key_here
   GOOGLE_API_KEY_1=your_fallback_key_1_here
   GOOGLE_API_KEY_2=your_fallback_key_2_here
   GOOGLE_API_KEY_3=your_fallback_key_3_here
   GOOGLE_API_KEY_4=your_fallback_key_4_here
   ```

4. **Test API keys**
   ```bash
   npm run test:api
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
content-platform/
├── app/                 # Next.js app directory
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── public/             # Static assets
├── scripts/            # Utility scripts
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:api` - Test API keys

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 