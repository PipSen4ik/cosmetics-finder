import React from 'react';

import paginationCss from "./paginationCss.module.scss"
import leftArrow from "../../assets/pagination/left.svg"
import doubleLeftArrow from "../../assets/pagination/leftleft.svg"
import rightArrow from "../../assets/pagination/right.svg"
import doubleRightArrow from "../../assets/pagination/rightright.svg"

const Pagination = ({nextPage, prevPage, firstPage, lastPage, curPage, setPage, listOfPages, dots}) => {
    const renderPages = () => {
        return listOfPages.map((item, index) => {
            let classesForPages = [paginationCss.page]
            if (curPage === item) {
                classesForPages.push(paginationCss.active)
            } else if (item === dots) {
                classesForPages.push(paginationCss.dots)
            }

            const handleClick = () => {
                if (item !== dots) {
                    setPage(item)
                }
            }
            return <li onClick={handleClick} className={classesForPages.join(" ")} key={index}>{item}</li>
        });
    }

    return <div className={paginationCss.pagination}>
        <div className={paginationCss.firstPage} onClick={firstPage}>
            <img src={doubleLeftArrow} alt={"doubleLeftArrow"}/>
        </div>
        <div className={paginationCss.prevPage} onClick={prevPage}>
            <img src={leftArrow} alt={"leftArrow"}/>
        </div>
        <ul>
            {renderPages()}
        </ul>
        <div className={paginationCss.nextPage} onClick={nextPage}>
            <img src={rightArrow} alt={"rightArrow"}/>
        </div>
        <div className={paginationCss.lastPage} onClick={lastPage}>
            <img src={doubleRightArrow} alt={"doubleRightArrow"}/>
        </div>
    </div>
}

export default Pagination;
