import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://hjpuuwgcwywzcntprhad.supabase.co/rest',
});

apiClient.defaults.headers.common['apiKey'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcHV1d2djd3l3emNudHByaGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzODczNTIsImV4cCI6MjAwNDk2MzM1Mn0.rXKGHwQAb1h5i0dVqDkr-HejejWsL5dntZgfapvUMmI';
