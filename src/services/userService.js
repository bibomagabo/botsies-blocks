import users from '../data/users.json';

// Simulate a delay for asynchronous API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Register a new user
export async function registerUser(newUser) {
  await delay(500); // Simulate API response delay

  // Check if email already exists
  const existingUser = users.find((user) => user.email === newUser.email);
  if (existingUser) {
    throw new Error('Email already in use.');
  }

  // Create new user
  const newUserId = users.length + 1;
  const user = { id: newUserId, ...newUser };

  // Add to database (mock update, replace with actual DB later)
  users.push(user);

  console.log('User registered:', user);
  return user;

}

// Mock Login Function
export async function loginUser(credentials) {
  await delay(500); // Simulate API response delay

  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  console.log('User logged in:', user);
  return user;
}
