import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { signIn, signInSuccess } from '../../store/userSlice';
import './Signin.css';

export function Signin({ onRegisterClick }: { onRegisterClick: (isSigningIn: boolean) => void }) {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignInFail, setIsSignInFail] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.toLowerCase());
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignIn = (email: string, password: string) => {
        signIn(email, password)
            .then((response) => {
                dispatch(signInSuccess(response.accessToken));
                setIsSignInFail(false);
            })
            .catch((err) => {
                console.log(err);
                setIsSignInFail(true);
            });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleSignIn(email, password);
        }
    };

    let invalidSignInDialogue: any = null;
    if (isSignInFail) {
        invalidSignInDialogue = <div className="Signin-fail">Invalid login</div>;
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
