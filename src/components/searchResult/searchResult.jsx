import React, {useEffect, useRef} from 'react';

import searchResultCss from "./searchResultCss.module.scss"
import {chooseCategory} from "../../redux-toolkit/findbrand/findbrand-slice";
import {connect} from "react-redux";

const SearchResult = ({
                          children,
                          categories,
                          chooseCategory,
                          currentCategory,
                          searchValue,
                          searchResult,
                          isAccurateSearch
                      }) => {
    const refCheckboxArticle = useRef();
    const refCheckboxBrand = useRef();
    const refCheckboxLine = useRef();
    const refCheckboxName = useRef();
    const checkboxes = [refCheckboxArticle.current, refCheckboxBrand.current, refCheckboxLine.current, refCheckboxName.current];

    useEffect(() => {
        if (checkboxes[0] !== undefined) {
            checkboxes.forEach((item) => {
                if (currentCategory === item.value) {
                    item.checked = true;
                    handleToggleChecked(item);
                } else if (currentCategory !== item.value) {
                    item.checked = false;
                    handleToggleChecked(item);
                }

                if (item.checked) {
                    chooseCategory(item.value);
                }
            })
        }
    }, [currentCategory, searchValue, searchResult, isAccurateSearch])

    const handleToggleChecked = (checkbox) => {
        if (checkbox.checked) {
            checkbox.labels[0].classList.add(searchResultCss.checked);
        } else {
            checkbox.labels[0].classList.remove(searchResultCss.checked);
        }
    }

    const handleChangeCheckbox = (event) => {
        if (event.currentTarget.checked) {
            chooseCategory(event.currentTarget.value);
        } else {
            chooseCategory(categories.all);
        }
    }

    return <div className={searchResultCss.resultWrap}>
        <table className={searchResultCss.result}>
            <tbody>
            <tr>
                <th>
                    <label htmlFor={categories.article}>АРТИКУЛ</label>
                    <input ref={refCheckboxArticle} onChange={handleChangeCheckbox} type={"checkbox"}
                           name={"searchCategory"} value={categories.article}
                           id={categories.article}/>
                </th>
                <th>
                    <label htmlFor={categories.brand}>БРЕНД</label>
                    <input ref={refCheckboxBrand} onChange={handleChangeCheckbox} type={"checkbox"}
                           name={"searchCategory"} value={categories.brand}
                           id={categories.brand}/>
                </th>
                <th>ЗАЛ</th>
                <th>РЯД</th>
                <th>ОПИСАНИЕ</th>
                <th>ФОТО</th>
                <th>
                    <label htmlFor={categories.line}>ЛИНИЯ</label>
                    <input ref={refCheckboxLine} onChange={handleChangeCheckbox} type={"checkbox"}
                           name={"searchCategory"} value={categories.line}
                           id={categories.line}/>
                </th>
                <th>
                    <label htmlFor={categories.name}>НАЗВАНИЕ</label>
                    <input ref={refCheckboxName} onChange={handleChangeCheckbox} type={"checkbox"}
                           name={"searchCategory"} value={categories.name}
                           id={categories.name}/>
                </th>
            </tr>
            {children}
            </tbody>
        </table>
    </div>
}
const mapStateToProps = (state) => {
    return {
        categories: state.findBrandReducer.categories,
        currentCategory: state.findBrandReducer.categories.current,
        searchValue: state.findBrandReducer.searchValue,
        searchResult: state.findBrandReducer.searchResult,
        isAccurateSearch: state.findBrandReducer.isAccurateSearch
    }
}

const mapDispatchToProps = {
    chooseCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
