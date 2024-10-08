import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { register } from '../../api';
import { onSignInSuccess } from '../../store/userSlice';
import './Register.css';

export function Register({ onSigninClick }: { onSigninClick: (isSigningIn: boolean) => void }) {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterFail, setIsRegisterFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.toLowerCase());
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRegister = (email: string, password: string) => {
        register(email, password)
            .then((response) => {
                if (response.status === true) {
                    dispatch(onSignInSuccess(response.accessToken, {}, {}));
                    setIsRegisterFail(false);
                    setErrorMessage('');
                } else {
                    setIsRegisterFail(true);
                    setErrorMessage(response.error);
                }
            })
            .catch(() => {
                setIsRegisterFail(true);
                setErrorMessage('please try again later');
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleRegister(email, password);
        }
    };

    let invalidRegisterDialogue: any = null;
    if (isRegisterFail) {
        invalidRegisterDialogue = <div className="Register-fail">Unable to register: {errorMessage}</div>;
    }

    return (
        <div className="Register-register">
            <div className="Register-form" onKeyDown={handleKeyPress}>
                <div className="Register-header">Register</div>

                {invalidRegisterDialogue}

                <label htmlFor="email-address">Email</label>
                <input
                    className="Register-input"
                    type="email"
                    placeholder="Email"
                    id="email-address"
                    onChange={handleEmailChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    className="Register-input"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handlePasswordChange}
                />

                <button className="Register-button" onClick={() => handleRegister(email, password)}>
                    Register
                </button>
                <div className="Register-signin-link" onClick={() => onSigninClick(true)}>
                    Sign In
                </div>
            </div>
        </div>
    );
}
