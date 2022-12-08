import { useState } from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { Tabs } from '../components/Tabs/Tabs';
import { Pantry } from '../components/Pantry/Pantry';
import { Grocery } from '../components/Grocery/Grocery';
import './App.css';

function App() {
  const [index, setIndex] = useState(0);

  const tabNames = ['Pantry', 'Groceries', 'Recipes'];

  let content = null;
  if (index === 0) {
    content = (
      <Pantry />
    )
  } else if (index === 1) {
    content = (
      <Grocery />
    )
  } else if (index === 2) {
    content = (
      <h2>Recipes placeholder</h2>
    )
  }

  return (
    <div className='App'>
      <Navigation />
      <Tabs tabNames={tabNames} onTabSelect={setIndex} />
      <div className='App-content'>
        {content}
      </div>
    </div>
  );
}

export default App;
