#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 Kopa Supabase Setup Helper')
console.log('===============================\n')

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local')
const envExists = fs.existsSync(envPath)

if (!envExists) {
  console.log('📝 Creating .env.local file...')
  
  const envContent = `# Supabase Configuration
# Replace these with your actual Supabase project credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: For production
# NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
# NEXT_PUBLIC_APP_URL=http://localhost:3000
`
  
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env.local file created!')
  console.log('⚠️  Please update the values with your actual Supabase credentials\n')
} else {
  console.log('✅ .env.local file already exists')
  
  // Check if values are still placeholder
  const envContent = fs.readFileSync(envPath, 'utf8')
  if (envContent.includes('your_supabase_project_url_here')) {
    console.log('⚠️  Please update your Supabase credentials in .env.local\n')
  } else {
    console.log('✅ Supabase credentials appear to be configured\n')
  }
}

// Check if supabase-schema.sql exists
const schemaPath = path.join(__dirname, 'supabase-schema.sql')
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema file found (supabase-schema.sql)')
  console.log('📋 Copy this file content to your Supabase SQL Editor\n')
} else {
  console.log('❌ Database schema file not found')
}

console.log('📚 Next Steps:')
console.log('1. Create a Supabase project at https://supabase.com')
console.log('2. Get your project URL and anon key from Settings > API')
console.log('3. Update .env.local with your credentials')
console.log('4. Run the SQL schema in your Supabase SQL Editor')
console.log('5. Configure authentication settings in Supabase dashboard')
console.log('6. Start your development server: npm run dev')
console.log('\n📖 For detailed instructions, see SUPABASE_SETUP.md')

// Check if development server is running
const { exec } = require('child_process')
exec('netstat -an | findstr :3000', (error, stdout) => {
  if (stdout.includes('LISTENING')) {
    console.log('\n✅ Development server appears to be running on port 3000')
  } else {
    console.log('\n💡 To start the development server, run: npm run dev')
  }
}) 