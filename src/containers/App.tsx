import { useState } from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { Tabs } from '../components/Tabs/Tabs';
import { Pantry } from '../components/Pantry/Pantry';
import './App.css';

function App() {
  const [index, setIndex] = useState(0);

  const tabNames = ['Pantry', 'Groceries', 'Recipes'];

  let content = null;
  if (index === 0) {
    content = (
      <div className='content'>
        <Pantry />
      </div>
    )
  } else if (index === 1) {
    content = (
      <div className='content'>
        <h2>Groceries placeholder</h2>
      </div>
    )
  } else if (index === 2) {
    content = (
      <div className='content'>
        <h2>Recipes placeholder</h2>
      </div>
    )
  }

  return (
    <div className='App'>
      <Navigation />
      <Tabs tabNames={tabNames} onTabSelect={setIndex} />
      {content}
    </div>
  );
}

export default App;
