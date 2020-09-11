import preloader from "../../../assets/images/preloader.gif";
import React from "react";

type PropsType = {
    
}

let Preloader = (props: PropsType) => {
        return <div style={{backgroundColor: 'white'}}>
            <img src={preloader} />
        </div>
};

export default Preloader;