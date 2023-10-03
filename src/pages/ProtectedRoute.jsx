import { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const { isAthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(
        function () {
            if (!isAthenticated) navigate('/')
        }, [isAthenticated, navigate])


    return isAthenticated ? children : null
}
