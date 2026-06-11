import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwkhvovpefpuehrbncxp.supabase.co';
const supabaseKey = 'jwkhvovpefpuehrbncxp';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('Seeding demo users...');

    const users = [
        { email: 'patient@demo.com', password: 'password123', name: 'John Doe', role: 'patient' },
        { email: 'doctor@demo.com', password: 'password123', name: 'Dr. Sarah Smith', role: 'doctor' },
        { email: 'admin@demo.com', password: 'password123', name: 'System Admin', role: 'admin' }
    ];

    for (const u of users) {
        console.log(`Creating ${u.email}...`);
        
        // 1. Sign up user (Auth)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: u.email,
            password: u.password,
        });

        if (authError) {
            console.error(`Error creating auth for ${u.email}:`, authError.message);
            continue;
        }

        // 2. Insert into profiles table
        if (authData.user) {
            const { error: profileError } = await supabase.from('profiles').upsert([
                { id: authData.user.id, email: u.email, name: u.name, role: u.role }
            ]);
            
            if (profileError) {
                console.error(`Error creating profile for ${u.email}:`, profileError.message);
            } else {
                console.log(`Successfully created ${u.email}`);
            }
        }
    }
    console.log('Seeding complete.');
}

seed();
