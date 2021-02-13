import React from "react";
import styles from "./Paginator.module.css";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator = (props: PropsType) => {

    // определяем количество страниц для отрисовки
    // разделив количество всех пользователей на
    // размер страницы для отрисовки
    // затем полученный результат от деления округляем в большую сторону
    let pagesCount: number = Math.ceil(props.totalUsersCount / props.pageSize);
    // создаём массив страниц, котороый потом отрисуем
    let pages = [];
    // заполним массив pages
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? styles.selectedPage : " "}
                         onClick={(e) => {
                             props.onPageChanged(p)
                         }}>{p}</span>
        })}
    </div>
}

export default Paginator;
