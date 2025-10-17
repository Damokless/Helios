import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/system'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HeroUIProvider>
            <main className='dark text-foreground bg-background'>
                <App />
            </main>
        </HeroUIProvider>
    </StrictMode>
)
