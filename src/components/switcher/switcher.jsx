import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode"
import useDarkSide from "../../Hooks/darkSide";



export default function Swicther(){
    const [colorTheme,setTheme] = useDarkSide()
    const [darkSide,setDarkSide] = useState(
        colorTheme === "light" );

    const toggleDarkMode = (checked) => {
        newTheme = checked ? "dark" :"light"
        setTheme(newTheme);
        setDarkSide(checked);
    }
    return(
        <div>
            <DarkModeSwitch 
            style ={{marginBottom: "2rem"}}
            checked = {darkSide}
            onChange = {toggleDarkMode}
            size ={30}
            />
        </div>
    )
}