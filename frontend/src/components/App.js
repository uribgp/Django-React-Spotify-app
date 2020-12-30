import React from "react";
import { render } from 'react-dom';
import Homepage from './Homepage';

export default function App(props){
    
    return <Homepage />
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
