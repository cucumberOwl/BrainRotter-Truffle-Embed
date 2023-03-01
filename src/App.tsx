import { useState } from 'react'
import subway from './assets/subway_thumbnail.jpg'
import './App.css'
import { embed } from '@trufflehq/sdk'
import Draggable from './components/Draggable'
import Navbar from './components/Navbar'
import { Dimensions, Modifiers, Vector } from "./Draggable.tsx";

function App() {
  const defaultModifier: Modifiers = {
    top: 0, right: 0, bottom: 0, left: 0,
    transition: "none",
  };
  const base: Vector = { x: 800, y: 800 };
  const startingDimensions: Dimensions = {
    base: base,
    modifiers: defaultModifier,
  };
  const startPosition: Vector = { x: 1400, y: 100 };
  const [dragProps, setDragProps] = useState(
    {
      dimensions: startingDimensions,
      defaultPosition: startPosition,
    },
  );

  //videos
  //subway
  //https://www.youtube.com/embed/ChBg4aowzX8
  //asmr
  //https://www.youtube.com/embed/QpxRSFXXrHk
  //minecraft
  //https://www.youtube.com/embed/n_Dv4JMiwK8
  //gta V
  //https://www.youtube.com/embed/3J-vwMbYc2Y
  

  //subway surf games
  //https://files.ufreegame.net/1024/Subway-Surfers-Zurich/

  const [isDragging, setIsDragging] = useState(false)

  const [isSmall, setIsSmall] = useState(true)

  const setSize = () => {
    if (isSmall) {
      // Do not use embed.setSize with the draggable component.
      // The draggable component creates a fullscreen iframe
      // The size is determined by a clip path
      // embed.setSize("800px", "800px")
      setIsSmall(false)
    } else {
      // embed.setSize("600px", "600px")
      setIsSmall(true)
    }
  }
    
  const appStyles = {
    width: isSmall ? 50 : 450, 
    height: isSmall ? 50 : 700    
  }

  const startPress = () => {
    setIsDragging(false);
    setTimeout(function(){ setIsDragging(true) }, 200);
  }

  const [subwaylink, setLink] = useState('');
  const [appMenu, setAppMenuClass] = useState("app-menu hide");

  const endPress = () => {
    if(!isDragging)
    {
        setSize();
        appMenu == "app-menu" ? setAppMenuClass("app-menu hide") : setAppMenuClass("app-menu")
        subwaylink ? setLink('') : setLink('https://files.ufreegame.net/1024/Subway-Surfers-Zurich/');
    }
  }

  const menuClick = (url) => {
    setLink(url);
  };

  return (
    <Draggable
    dimensions={dragProps.dimensions}
    defaultPosition={dragProps.defaultPosition}
    ignoreClassName="no-drag"
    >
      <div className="App" style={appStyles}>
        <div className='nav-container'>               
           <img src={subway} onMouseDown={startPress} onMouseUp={endPress} className="logo" />    
            <div className={appMenu}>
                <Navbar setLink={menuClick}></Navbar>
            </div>
        </div>
        <div className="app-container">
            <div className="iframe-container">
                <iframe src={subwaylink} width="450px" height="700px">
            </iframe>
            </div> 
            <div className="resize-control">

            </div>
        </div>
      </div>
    </Draggable>
  )
}

export default App