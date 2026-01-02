import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response('Missing fields', { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_NAME!);
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return new Response('User already exists', { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    provider: 'credentials',
    createdAt: new Date(),
  });

  return new Response('User created', { status: 201 });
}
