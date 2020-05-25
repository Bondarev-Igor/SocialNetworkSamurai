import React from "react";
import style from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

  type PropsType ={
      name:string
      id: string
  }
  
  type MessaageType = {
      message: string
  }
   const DialogItem =(props: PropsType)=> {

      let path = "/dialogs/"+props.id
       return  <div className={style.dialog + " " + style.active}>
           <NavLink to={path}>{props.name}</NavLink>
       </div>
   };
  
  const Message = (props: MessaageType)=>{
      return <div className={style.message}>{props.message}</div>
  }

const Dialogs = (props: PropsType) => {
    return <div className={style.dialogs}>
        <div className={style.dialogsItems}>
            <DialogItem name = 'Dimych' id='1'/>
            <DialogItem name = 'Elena' id='2'/>
            <DialogItem name = 'Ekaterina' id='3'/>
            <DialogItem name = 'Victor' id='4'/>
            <DialogItem name = 'Valera' id='5'/>
        </div>
        <div className={style.messages}>
            <Message message={'Hi'}/>
            <Message message={'Ku'}/>
            <Message message={'Yo'}/>
        </div>
    </div>
};

export default Dialogs;