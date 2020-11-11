import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import TextFlipAnimated from "./components/TextFlipAnimated";
import Title from "./components/Title";

function App() {

  const [welcome, setWelcome] = useState(true)

  function changeState() {
    setTimeout(() => {
      setWelcome(false)
    }, 6000)
  }

  function changeStateImmediately() {
    setWelcome(false)
  }



  return (
    <div onClick={changeStateImmediately}>
      {changeState()}
      {welcome ? <TextFlipAnimated/>
          : <div><Title/><TodoList/></div>
      }
    </div>
  );
}

export default App;
