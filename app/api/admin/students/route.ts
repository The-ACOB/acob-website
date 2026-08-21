import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize Supabase Admin client using Service Role Key
const getAdminClient = () => {
  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('placeholder')) {
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Server-side in-memory cache for mock students when Supabase is not configured
let mockStudents: any[] = [
  {
    id: 'mock-student-1',
    full_name: 'Tanvir Ahmed',
    email: 'tanvir@example.com',
    phone: '+880 1711223344',
    school: 'Dhaka Residential Model College',
    grade: 'Class 10',
    avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Tanvir%20Ahmed',
    password_plain: 'tanvir123',
    registered_events: ['acob-2026'],
    updated_at: new Date().toISOString()
  },
  {
    id: 'mock-student-2',
    full_name: 'Ayesha Rahman',
    email: 'ayesha@example.com',
    phone: '+880 1811223344',
    school: 'Viqarunnisa Noon School & College',
    grade: 'Class 12',
    avatar_url: 'https://api.dicebear.com/7.x/initials/svg?seed=Ayesha%20Rahman',
    password_plain: 'ayesha123',
    registered_events: ['cog-sci-2026'],
    updated_at: new Date().toISOString()
  }
];

export async function GET(req: NextRequest) {
  const adminClient = getAdminClient();
  if (!adminClient) {
    return NextResponse.json({ students: mockStudents });
  }

  try {
    const { data: profiles, error } = await adminClient
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ students: profiles || [] });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const adminClient = getAdminClient();
  const body = await req.json();
  const { full_name, email, password, phone, school, grade, registered_events } = body;

  if (!email || !password || !full_name) {
    return NextResponse.json({ error: 'Missing required fields: full_name, email, password' }, { status: 400 });
  }

  if (!adminClient) {
    // Mock Mode
    const newStudent = {
      id: `mock-student-${Date.now()}`,
      full_name,
      email,
      phone: phone || '',
      school: school || 'Not specified',
      grade: grade || 'Not specified',
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name)}`,
      password_plain: password,
      registered_events: registered_events || [],
      updated_at: new Date().toISOString()
    };
    mockStudents.unshift(newStudent);
    return NextResponse.json({ student: newStudent });
  }

  try {
    // 1. Create Auth User
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name,
        phone: phone || '',
        school: school || 'Not specified',
        grade: grade || 'Not specified',
        password_plain: password,
        registered_events: registered_events || []
      }
    });

    if (authError) throw authError;
    const user = authData.user;

    // 2. Fetch the created profile (the trigger should have created it, but let's upsert to be safe)
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .upsert({
        id: user.id,
        full_name,
        school: school || 'Not specified',
        grade: grade || 'Not specified',
        avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(full_name)}`,
        phone: phone || '',
        email,
        password_plain: password,
        registered_events: registered_events || [],
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return NextResponse.json({ student: profile });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: error.message || 'Failed to create student' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const adminClient = getAdminClient();
  const body = await req.json();
  const { id, full_name, email, password, phone, school, grade, registered_events } = body;

  if (!id) {
    return NextResponse.json({ error: 'Missing student ID' }, { status: 400 });
  }

  if (!adminClient) {
    // Mock Mode
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    const updated = {
      ...mockStudents[index],
      full_name: full_name || mockStudents[index].full_name,
      email: email || mockStudents[index].email,
      phone: phone !== undefined ? phone : mockStudents[index].phone,
      school: school !== undefined ? school : mockStudents[index].school,
      grade: grade !== undefined ? grade : mockStudents[index].grade,
      password_plain: password || mockStudents[index].password_plain,
      registered_events: registered_events !== undefined ? registered_events : mockStudents[index].registered_events,
      updated_at: new Date().toISOString()
    };
    mockStudents[index] = updated;
    return NextResponse.json({ student: updated });
  }

  try {
    // 1. Update Auth User credentials if email/password/metadata changed
    const updateParams: any = {
      user_metadata: {
        full_name,
        phone: phone || '',
        school: school || 'Not specified',
        grade: grade || 'Not specified',
        registered_events: registered_events || []
      }
    };
    if (email) updateParams.email = email;
    if (password) {
      updateParams.password = password;
      updateParams.user_metadata.password_plain = password;
    }

    const { error: authError } = await adminClient.auth.admin.updateUserById(id, updateParams);
    if (authError) throw authError;

    // 2. Update Profile table
    const profileUpdate: any = {
      full_name,
      school: school || 'Not specified',
      grade: grade || 'Not specified',
      phone: phone || '',
      registered_events: registered_events || [],
      updated_at: new Date().toISOString()
    };
    if (email) profileUpdate.email = email;
    if (password) profileUpdate.password_plain = password;

    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .update(profileUpdate)
      .eq('id', id)
      .select()
      .single();

    if (profileError) throw profileError;

    return NextResponse.json({ student: profile });
  } catch (error: any) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: error.message || 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const adminClient = getAdminClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing student ID' }, { status: 400 });
  }

  if (!adminClient) {
    // Mock Mode
    mockStudents = mockStudents.filter(s => s.id !== id);
    return NextResponse.json({ success: true });
  }

  try {
    // 1. Delete Auth User (cascades or deletes corresponding profile via cascade in schema)
    const { error: authError } = await adminClient.auth.admin.deleteUser(id);
    if (authError) throw authError;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete student' }, { status: 500 });
  }
}
