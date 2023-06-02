import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loadAllItems, signIn } from '../../api';
import { onSignInSuccess } from '../../store/userSlice';
import './Signin.css';

export function Signin({ onRegisterClick }: { onRegisterClick: (isSigningIn: boolean) => void }) {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignInFail, setIsSignInFail] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.toLowerCase());
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async (email: string, password: string) => {
        let accessToken: string | null = null;
        try {
            accessToken = (await signIn(email, password)).accessToken;
        } catch (error) {
            setIsSignInFail(true);
            setErrorMessage('Invalid login');
        }

        if (accessToken) {
            try {
                const items = await loadAllItems(accessToken);
                dispatch(onSignInSuccess(accessToken, items.pantryItems, items.groceryItems));
                setIsSignInFail(false);
                setErrorMessage('');
            } catch (error) {
                setIsSignInFail(true);
                setErrorMessage('Unable to login: please try again later');
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleSignIn(email, password);
        }
    };

    let invalidSignInDialogue: any = null;
    if (isSignInFail) {
        invalidSignInDialogue = <div className="Signin-fail">{errorMessage}</div>;
    }

    return (
        <div className="Signin-signin">
            <div className="Signin-form" onKeyDown={handleKeyPress}>
                <div className="Signin-header">Sign In</div>

                {invalidSignInDialogue}

                <label htmlFor="email-address">Email</label>
                <input
                    className="Signin-input"
                    type="email"
                    placeholder="Email"
                    id="email-address"
                    onChange={handleEmailChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    className="Signin-input"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handlePasswordChange}
                />

                <button className="Signin-button" onClick={() => handleSignIn(email, password)}>
                    Sign In
                </button>
                <div className="Signin-register-link" onClick={() => onRegisterClick(false)}>
                    Register
                </div>
            </div>
        </div>
    );
}
