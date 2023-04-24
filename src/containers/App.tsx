import { useState, useEffect } from 'react';
import { Signin } from '../components/Signin/Signin';
import { Register } from '../components/Register/Register';
import { Navigation } from '../components/Navigation/Navigation';
import { Tabs } from '../components/Tabs/Tabs';
import { Pantry } from '../components/Pantry/Pantry';
import { Grocery } from '../components/Grocery/Grocery';
import { useAppSelector } from '../store/hooks';
import './App.css';

function App() {
  const [index, setIndex] = useState(0);
  const [isSigningIn, setIsSigningIn] = useState(true);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  useEffect(() => {
    setIsSigningIn(true);
  }, [accessToken !== null]);

  const tabNames = ['Pantry', 'Groceries', 'Recipes'];

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
        <div className='App-content'>{tabContent}</div>
      </div>
    );
  }

  return (
    <div className='App'>
      <Navigation />
      {content}
    </div>
  );
}

export default App;
