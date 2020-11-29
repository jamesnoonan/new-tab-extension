import './App.css';
import Quote from './Quote/Quote';
import Clock from './Clock/Clock';
import Background from './Background/Background';
import { useState } from 'react';

function App() {
  const [opacity, changeOpacity] = useState(0);

  setTimeout(() => {
    changeOpacity(1);
  }, 50);

  return (
    <div className="Background_Parent" style={{ opacity }}>
      <Background>
        <Clock />
        <Quote />
      </Background>
    </div>
  );
}

export default App;
