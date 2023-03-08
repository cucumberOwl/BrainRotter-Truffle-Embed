import React from 'react'
import { useEffect, useState} from 'react';
import {CgArrowsExpandLeft} from "react-icons/cg";

export default function Resizeable() {
  

  return (
    <div className="resize-control no-drag">
        <div className="no-drag">
        <CgArrowsExpandLeft className="no-drag"></CgArrowsExpandLeft>
        </div>                
    </div>
  );
}