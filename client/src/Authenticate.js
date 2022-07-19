import React from 'react'
import { useSearchParams, Navigate } from 'react-router-dom';
export default function Home() {
    const [serach, setsearch] = useSearchParams()
    const Auth = serach.get('auth');
    if (Auth) {
        const name = serach.get('name');
        const email = serach.get('email');
        const Avatar = serach.get('avatar');
        localStorage.setItem('AlgoViz_token', Auth)
        localStorage.setItem('AlgoViz_name', name)
        localStorage.setItem('AlgoViz_email', email)
        localStorage.setItem('AlgoViz_avatar', Avatar)
    }
    return (
        <>
            {Auth ? <Navigate to='/' /> : <Navigate to='/login' />
            }
        </>
    )
}
