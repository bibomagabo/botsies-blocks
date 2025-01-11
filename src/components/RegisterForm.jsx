import { useState } from 'react';
import { registerUser } from '../services/userService';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      // Call the mock API to register user
      const registeredUser = await registerUser(newUser);
      alert(`User registered successfully! Welcome, ${registeredUser.fullName}`);
    } catch (error) {
      alert(error.message);
    }
  };

  // *** The return statement starts here, inside the main function ***
  return (
    <form
      className="flex flex-col space-y-4 p-4 border rounded-md shadow-md bg-white max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-blue-500">Register</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm your password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Register
      </button>

      <div className="text-sm text-center mt-2">
        <a href="/" className="text-blue-500 hover:underline">
          Existing User? Login here!
        </a>
        <span className="mx-2">|</span>
        <a href="/guest-chat" className="text-blue-500 hover:underline">
          Login as Guest
        </a>
      </div>
    </form>
  );
}
