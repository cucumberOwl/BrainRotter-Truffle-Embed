import { useState } from 'react'
import subway from './assets/subway_thumbnail.jpg'
import './App.css'
import { embed } from '@trufflehq/sdk'
import Draggable from './components/Draggable'
import Navbar from './components/Navbar'
import { Dimensions, Modifiers, Vector } from "./components/Draggable.tsx";
import Resizeable from './components/Resizeable'


function App() {
  const defaultModifier: Modifiers = {
    top: 0, right: 0, bottom: 0, left: 0,
    transition: "none",
  };

  const maximize: Vector = { x: 460, y: 820 };
  const base: Vector = { x: 50, y: 50 };

  const startingDimensions: Dimensions = {
    base: base,
    modifiers: defaultModifier,
  };

  const maxDimensions: Dimensions = {
    base: maximize,
    modifiers: defaultModifier,
  };

  const startPosition: Vector = { x: 1800, y: 100 };
  const [dragProps, setDragProps] = useState(
    {
      dimensions: startingDimensions,
      defaultPosition: startPosition,
    },
  );

  const [isDragging, setIsDragging] = useState(false)

  const [isSmall, setIsSmall] = useState(true)

  const setSize = () => {
    if (isSmall) {
      // Do not use embed.setSize with the draggable component.
      // The draggable component creates a fullscreen iframe
      // The size is determined by a clip path
      // embed.setSize("800px", "800px")
      setIsSmall(false)
      setAppContainerStyle("app-container cont-max")
      setDragProps({
        dimensions: maxDimensions, defaultPosition: startPosition
      })
    } else {
      // embed.setSize("600px", "600px")
      setIsSmall(true)
      setAppContainerStyle("app-container cont-min")
      setDragProps({
        dimensions: startingDimensions, defaultPosition: startPosition
      })
    }
  }
    
  const appStyles = {
    width: isSmall ? 50 : 460, 
    height: isSmall ? 50 : 830    
  }

  const startPress = () => {
    setIsDragging(false);
    setTimeout(function(){ setIsDragging(true) }, 200);
  }

  const [subwaylink, setLink] = useState('');
  const [appMenu, setAppMenuClass] = useState("app-menu hide");

  const [appContainerStyle, setAppContainerStyle] = useState("app-container cont-min");
  

  const endPress = () => {
    if(!isDragging)
    {
        setSize();
        appMenu == "app-menu" ? setAppMenuClass("app-menu hide") : setAppMenuClass("app-menu")
        if(subwaylink == '')
          setLink('https://files.ufreegame.net/1024/Subway-Surfers-Zurich/');
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
        <div className={appContainerStyle}>
            <div className="iframe-container">
                <iframe src={subwaylink} scrolling="no" frameborder="0">
                </iframe>
            </div>             
        </div>
      </div>
    </Draggable>
  )
}

export default App