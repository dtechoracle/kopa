# Role-Based System for Kopa

## Overview

Kopa implements a role-based system to differentiate between:
- **Group Admins/Creators**: Users who create and manage savings groups
- **Regular Members**: Users who only contribute to savings groups

## Database Schema

### User Roles
```sql
-- Users can have different roles
CREATE TYPE user_role AS ENUM ('member', 'admin', 'super_admin');

-- Add role to users table (optional)
ALTER TABLE auth.users ADD COLUMN role user_role DEFAULT 'member';
```

### Group Ownership
```sql
-- Groups table tracks the creator/admin
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  -- other fields...
);

-- Group members table tracks all members including admin
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT false,
  -- other fields...
);
```

## Role Determination Logic

### How Roles Are Determined

1. **Admin Role**: User is admin if they:
   - Created at least one group (admin_id in groups table)
   - OR are marked as admin in any group_members table

2. **Member Role**: User is member if they:
   - Are part of groups but not as admin
   - OR have no groups yet

### Code Implementation

```typescript
// In UserContext.tsx
const fetchUserRole = async () => {
  // Check if user is a group admin
  const { data: adminGroups } = await supabase
    .from('groups')
    .select('id')
    .eq('admin_id', user.id)
    .eq('is_active', true)

  // Check if user is admin of any group they're a member of
  const { data: memberGroups } = await supabase
    .from('group_members')
    .select('group_id, is_admin')
    .eq('user_id', user.id)

  let role: UserRole = 'member'
  
  if (adminGroups && adminGroups.length > 0) {
    role = 'admin'
  } else if (memberGroups && memberGroups.length > 0) {
    const isAdminOfAnyGroup = memberGroups.some(mg => mg.is_admin)
    if (isAdminOfAnyGroup) {
      role = 'admin'
    }
  }

  setUserRole(role)
  setPermissions(getUserPermissions(role))
}
```

## Permission System

### Admin Permissions
- ✅ Create new groups
- ✅ Manage group members
- ✅ Send payment reminders
- ✅ View group analytics
- ✅ Delete groups
- ✅ Edit group settings

### Member Permissions
- ❌ Create groups
- ❌ Manage members
- ❌ Send reminders
- ❌ View analytics
- ✅ View their groups
- ✅ Track their payments
- ✅ Receive notifications

## UI Differences

### Dashboard Views

**Admin Dashboard:**
- Welcome: "Welcome back, Group Admin!"
- Features: Create groups, manage members, analytics
- Actions: "Create Group" button prominently displayed
- Stats: Focus on group management metrics

**Member Dashboard:**
- Welcome: "Welcome to Kopa!"
- Features: Track payments, view groups, receive notifications
- Actions: "Browse Groups" button
- Stats: Focus on personal contribution metrics

### Navigation Differences

**Admin Navigation:**
- Groups (with create option)
- Analytics
- Members Management
- Settings

**Member Navigation:**
- My Groups
- Payment History
- Notifications
- Settings

## Implementation Examples

### 1. Conditional Rendering
```tsx
import { AdminOnly, MemberOnly } from '@/components/RoleBasedInterface'

function Dashboard() {
  return (
    <div>
      <AdminOnly>
        <CreateGroupButton />
        <GroupAnalytics />
      </AdminOnly>
      
      <MemberOnly>
        <PaymentTracker />
        <GroupProgress />
      </MemberOnly>
    </div>
  )
}
```

### 2. Role-Based Welcome Messages
```tsx
import { RoleBasedWelcome } from '@/components/RoleBasedInterface'

function Dashboard() {
  return (
    <div>
      <RoleBasedWelcome />
      {/* Rest of dashboard */}
    </div>
  )
}
```

### 3. Permission Checks
```tsx
import { useUser } from '@/contexts/UserContext'

function SomeComponent() {
  const { permissions } = useUser()
  
  if (!permissions.canCreateGroups) {
    return <MemberView />
  }
  
  return <AdminView />
}
```

## Database Queries

### Get User's Groups (Admin)
```sql
-- Groups created by user
SELECT * FROM groups WHERE admin_id = 'user-uuid' AND is_active = true;
```

### Get User's Groups (Member)
```sql
-- Groups user is a member of
SELECT g.* FROM groups g
JOIN group_members gm ON g.id = gm.group_id
WHERE gm.user_id = 'user-uuid' AND g.is_active = true;
```

### Get Group Members (Admin Only)
```sql
-- All members of a group (admin can see)
SELECT gm.*, u.email, u.user_metadata
FROM group_members gm
LEFT JOIN auth.users u ON gm.user_id = u.id
WHERE gm.group_id = 'group-uuid';
```

## Security Considerations

### Row Level Security (RLS)
```sql
-- Users can only see groups they're members of
CREATE POLICY "Users can view their groups" ON groups
FOR SELECT USING (
  auth.uid() = admin_id OR 
  EXISTS (
    SELECT 1 FROM group_members 
    WHERE group_id = id AND user_id = auth.uid()
  )
);

-- Only admins can update their groups
CREATE POLICY "Only admins can update groups" ON groups
FOR UPDATE USING (auth.uid() = admin_id);
```

### API Endpoints
```typescript
// Admin-only endpoints
app.post('/api/groups', requireAdmin, createGroup)
app.put('/api/groups/:id', requireAdmin, updateGroup)
app.delete('/api/groups/:id', requireAdmin, deleteGroup)

// Member endpoints
app.get('/api/groups/my', getMyGroups)
app.get('/api/payments/my', getMyPayments)
```

## Benefits of This System

1. **Clear Separation**: Admins and members have distinct interfaces
2. **Security**: Role-based access control prevents unauthorized actions
3. **Scalability**: Easy to add new roles (super_admin, moderator, etc.)
4. **User Experience**: Tailored interfaces for different user types
5. **Flexibility**: Users can be admin of some groups and member of others

## Future Enhancements

1. **Super Admin Role**: Platform-wide administration
2. **Group Moderators**: Users who can help manage specific groups
3. **Temporary Admins**: Time-limited admin privileges
4. **Role Inheritance**: Admins can assign roles to other members
5. **Audit Trail**: Track role changes and permissions 