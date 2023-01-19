import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/userSlice';
import './Navigation.css';

export function Navigation() {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.user.accessToken);

    return (
        <nav className='Navigation-navbar'>
            <h1 className='Navigation-app-name'>My Pantry</h1>
            {accessToken != null ? <div className='Navigation-sign-out-button' onClick={() => dispatch(signOut())}>Sign Out</div> : null}
        </nav>
    )
}