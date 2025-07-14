# Kopa - Rotational Savings App

A modern, mobile-first web app for tracking rotational savings groups (Ajo/Esusu/Tontine) with a UI inspired by Kuda Bank.

## Features

- **Group Management**: Create and manage multiple savings groups
- **Member Tracking**: Add members and track their contributions
- **Payment Tracking**: Monitor who has paid and who's next
- **Smart Reminders**: Automated WhatsApp and SMS reminders
- **Progress Visualization**: Real-time progress bars and statistics
- **Mobile-First Design**: Optimized for mobile with responsive desktop layout
- **Secure Authentication**: Supabase-powered user authentication
- **Real-time Updates**: Live data synchronization

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd kopa
   npm install
   ```

2. **Set up Supabase** (see [Supabase Setup Guide](./SUPABASE_SETUP.md)):
   ```bash
   # Run the setup helper
   node setup-supabase.js
   ```

3. **Configure environment variables**:
   - Copy `env.example` to `.env.local`
   - Add your Supabase credentials

4. **Set up the database**:
   - Copy `supabase-schema.sql` content to Supabase SQL Editor
   - Run the SQL to create tables and policies

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   - Navigate to `http://localhost:3000`
   - Sign up for a new account or use demo mode

## Demo Mode

The app includes a demo mode that works without Supabase setup:

- Click "Try Demo" on the landing page
- Use mock data to test all features
- Perfect for exploring the app before setting up Supabase

## Project Structure

```
kopa/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── landing/           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   ├── contexts/              # React contexts
│   └── lib/                   # Utilities and configs
├── supabase-schema.sql        # Database schema
├── SUPABASE_SETUP.md          # Detailed setup guide
└── setup-supabase.js          # Setup helper script
```

## Key Features

### Authentication
- Email/password signup and login
- Automatic profile creation
- Session persistence
- Demo mode for testing

### Group Management
- Create savings groups with contribution amounts
- Set frequency (weekly/monthly)
- Add and manage members
- Track payment cycles

### Payment Tracking
- Visual progress indicators
- Payment status tracking
- Automated reminders
- Transaction history

### Mobile Optimization
- Bottom navigation for mobile
- Touch-friendly interfaces
- Responsive design
- Mobile-first approach

## Supabase Integration

The app is fully integrated with Supabase for:

- **Authentication**: Secure user management
- **Database**: PostgreSQL with Row Level Security
- **Real-time**: Live updates across devices
- **Storage**: File uploads (future feature)

### Database Schema

- `profiles`: User profiles
- `groups`: Savings groups
- `group_members`: Group members
- `cycles`: Contribution cycles
- `transactions`: Payment records
- `notifications`: User notifications
- `user_settings`: User preferences

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: See `SUPABASE_SETUP.md` for detailed setup instructions
- **Issues**: Create an issue on GitHub
- **Demo**: Try the app without setup using demo mode

---

Built with ❤️ for managing rotational savings groups effectively.
