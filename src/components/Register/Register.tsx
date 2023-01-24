import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/userSlice';
import './Register.css';

export function Register({ onSigninClick }: { onSigninClick: (isSigningIn: boolean) => void }) {
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.toLowerCase());
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value.toLowerCase());
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            dispatch(signIn({ email, password }))
        }
    }

    return (
        <div className='Register-register'>
            <div className='Register-form' onKeyDown={handleKeyPress}>
                <div className='Register-header'>Register</div>

                <label htmlFor='email-address'>Email</label>
                <input className='Register-input' type='email' placeholder='Email' id='email-address' onChange={handleEmailChange} />

                <label htmlFor='password'>Password</label>
                <input className='Register-input' type='password' placeholder='Password' id='password' onChange={handlePasswordChange} />

                <button className='Register-button' onClick={() => dispatch(signIn({ email, password }))}>Register</button>
                <div className='Register-signin-link' onClick={() => onSigninClick(true)}>Sign In</div>
            </div>
        </div>
    )
}