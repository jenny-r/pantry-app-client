import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { onSignOut } from '../../store/userSlice';
import './Navigation.css';

export function Navigation() {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.user.accessToken);

    return (
        <nav id="Navigation-navbar">
            <h1 className="Navigation-app-name">My Pantry</h1>
            {accessToken != null ? (
                <div className="Navigation-sign-out-button" onClick={() => dispatch(onSignOut())}>
                    Sign Out
                </div>
            ) : null}
        </nav>
    );
}
