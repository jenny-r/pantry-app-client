import { useState, useEffect } from 'react';
import { Signin } from '../components/Signin/Signin';
import { Register } from '../components/Register/Register';
import { Navigation } from '../components/Navigation/Navigation';
import { Tabs } from '../components/Tabs/Tabs';
import { Pantry } from '../components/Pantry/Pantry';
import { Grocery } from '../components/Grocery/Grocery';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadAllItems, setPantryState } from '../store/pantrySlice';
import { setGroceryState } from '../store/grocerySlice';
import './App.css';

function App() {
    const [index, setIndex] = useState(0);
    const [isSigningIn, setIsSigningIn] = useState(true);
    const accessToken = useAppSelector((state) => state.user.accessToken);

	const dispatch = useAppDispatch();

    useEffect(() => {
		if (accessToken !== null) {
			setIsSigningIn(true);
		}
    }, [accessToken]);

    const tabNames = ['Pantry', 'Groceries', 'Recipes'];

    if (isSigningIn && accessToken !== null) {
        loadAllItems(accessToken).then((response) => {
			dispatch(setPantryState(response.pantryItems));
			dispatch(setGroceryState(response.groceryItems));
		});
    }

    let content = null;
    if (accessToken === null) {
        content = isSigningIn ? (
            <Signin onRegisterClick={setIsSigningIn} />
        ) : (
            <Register onSigninClick={setIsSigningIn} />
        );
    } else {
        let tabContent = null;
        if (index === 0) {
            tabContent = <Pantry />;
        } else if (index === 1) {
            tabContent = <Grocery />;
        } else if (index === 2) {
            tabContent = <h2>Recipes placeholder</h2>;
        }
        content = (
            <div>
                <Tabs tabNames={tabNames} onTabSelect={setIndex} />
                <div className="App-content">{tabContent}</div>
            </div>
        );
    }

    return (
        <div className="App">
            <Navigation />
            {content}
        </div>
    );
}

export default App;
