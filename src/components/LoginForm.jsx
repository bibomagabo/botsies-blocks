import { useState } from 'react';
import { loginUser } from '../services/userService'; // Import login function


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const credentials = { email, password };
    const user = await loginUser(credentials); // Call mock API to verify login
    alert(`Welcome back, ${user.fullName}!`); // Success message
  } catch (error) {
    alert(error.message); // Display error if login fails
  }
};

  return (
    <form
      className="flex flex-col space-y-4 p-4 border rounded-md shadow-md bg-white max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-blue-500">Existing user? Login now!</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
  		type="submit"
  		className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
	>
  		Submit
	</button>
	
	<div className="text-sm text-center">
  		<a href="/register" className="text-blue-500 hover:underline">
    		New User? Create Account
  		</a>
  		<span className="mx-2">|</span>
		<a href="/guest-chat" className="text-blue-500 hover:underline">
  		Login as Guest
		</a>

</div>

    </form>
  );
}
