import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/userSlice';
import './Signin.css';

export function Signin() {
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
        <div className='Signin-signin'>
            <div className='Signin-form' onKeyDown={handleKeyPress}>
                <div className='Signin-header'>Sign In</div>

                <label htmlFor='email-address'>Email</label>
                <input className='Signin-input' type='email' placeholder='Email' id='email-address' onChange={handleEmailChange} />

                <label htmlFor='password'>Password</label>
                <input className='Signin-input' type='password' placeholder='Password' id='password' onChange={handlePasswordChange} />

                <button className='Signin-button' onClick={() => dispatch(signIn({ email, password }))}>Sign In</button>
                <div className='Signin-register-link'>Register</div>
            </div>
        </div>
    )
}