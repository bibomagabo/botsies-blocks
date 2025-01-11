import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Enable JSON imports
export default defineConfig({
  plugins: [react()],
  json: {
    stringify: true // Allows JSON imports
  }
});
