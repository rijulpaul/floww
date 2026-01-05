import './Header.css'
import { useEffect, useState } from 'react'

function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window === 'undefined') return 'light'
        const stored = window.localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored === 'light' || stored === 'dark') return stored
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        return prefersDark ? 'dark' : 'light'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        window.localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    return (
    <header className='header'>
            <h1 className='title'>FLOWW</h1>
            <button className='theme' onClick={toggleTheme}>
                {theme === 'light' ? <img className='theme-icon' src='./sun.png'></img> : <img className='theme-icon' src='./moon.png'></img>}
            </button>
        </header>
    )
}

export default Header
