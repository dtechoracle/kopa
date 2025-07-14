# Supabase Setup Guide for Kopa

This guide will help you set up Supabase integration for the Kopa rotational savings app.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `kopa-app` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be created (usually 1-2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up the Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql`
3. Paste it into the SQL editor and click "Run"
4. This will create all the necessary tables, policies, and functions

## Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/dashboard`
4. Save the changes

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try to sign up with a new account
3. Check if the user profile is created automatically
4. Test creating a group and adding members

## Database Schema Overview

The schema includes the following tables:

- **profiles**: User profiles (extends auth.users)
- **groups**: Savings groups
- **group_members**: Members of each group
- **cycles**: Contribution cycles for each group
- **transactions**: Payment records
- **notifications**: User notifications
- **user_settings**: User preferences

## Security Features

- **Row Level Security (RLS)**: All tables have RLS enabled
- **Policies**: Users can only access their own data and group data they're members of
- **Automatic Profile Creation**: User profiles are created automatically on signup
- **Data Validation**: Constraints ensure data integrity

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**:
   - Check that your environment variables are correct
   - Restart your development server after changing `.env.local`

2. **"Table doesn't exist" error**:
   - Make sure you ran the SQL schema in Supabase
   - Check the SQL editor for any errors

3. **Authentication not working**:
   - Verify your Site URL and Redirect URLs in Supabase settings
   - Check browser console for errors

4. **RLS blocking queries**:
   - Ensure you're authenticated
   - Check that the user has proper permissions

### Debug Mode:

To enable debug logging, add this to your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Production Deployment

When deploying to production:

1. Update your Supabase Site URL to your production domain
2. Add your production domain to Redirect URLs
3. Consider using environment-specific keys
4. Set up proper CORS settings if needed

## Next Steps

After setup, you can:

1. Customize the database schema for your specific needs
2. Add additional security policies
3. Set up real-time subscriptions for live updates
4. Configure email templates for notifications
5. Set up backup and monitoring

## Support

If you encounter issues:

1. Check the Supabase documentation
2. Review the browser console for errors
3. Check the Supabase dashboard logs
4. Verify your environment variables are correct

The app should now work with real authentication and data persistence! 