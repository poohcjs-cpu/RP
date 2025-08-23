import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 하위 경로 배포: 레포명이 RP이므로 반드시 '/RP/' 로 설정
  base: '/RP/',
})
