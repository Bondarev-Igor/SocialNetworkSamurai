import React, {useState} from "react";
import styles from "./Paginator.module.css";
import {Dispatch} from "redux";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

const Paginator = (props: PropsType) => {

    // определяем количество страниц для отрисовки
    // разделив количество всех пользователей на
    // размер страницы для отрисовки
    // затем полученный результат от деления округляем в большую сторону
    let pagesCount: number = Math.ceil(props.totalItemsCount / props.pageSize);
    // создаём массив страниц, котороый потом отрисуем
    let pages = [];
    // заполним массив pages
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

    return <div className={styles.paginator}>
        { portionNumber > 1 &&
        <button onClick={ () => { setPortionNumber (portionNumber - 1)} }>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
            return <span
                style ={{padding: "0px 3px 0px 3px "}}
                className={props.currentPage === p ? styles.selectedPage : " "}
                         onClick={(e) => {
                             props.onPageChanged(p)
                         }}>{p}</span>
        })}
        { portionCount > portionNumber &&
        <button onClick={ () => { setPortionNumber (portionNumber + 1)} }>NEXT</button>}
    </div>
}

export default Paginator;
