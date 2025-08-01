import React, {useState} from 'react';

import searchFormCss from "./searchFormCss.module.scss"
import trash from "../../assets/searchForm/trash.svg"
import {
    chooseCategory,
    searchItems, setAccurateSearch,
    setErrorMessage, setSearchValue
} from "../../redux-toolkit/findbrand/findbrand-slice";
import {connect} from "react-redux";

const SearchForm = ({
                        setErrorMessage,
                        searchItems,
                        placeholder,
                        categories,
                        chooseCategory,
                        setSearchValue,
                        setAccurateSearch
                    }) => {
    const [isInput, setInput] = useState("");

    const handleChangeValue = (event) => {
        setInput(event.currentTarget.value);
        setSearchValue(event.currentTarget.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter")
            handleSubmit();
    }

    const handleSubmit = (event) => {
        event?.preventDefault();
        if (isInput) {
            searchItems();
        }
    }

    const handleClickTrash = () => {
        setInput("");
        setErrorMessage("");
        chooseCategory(categories.all);
    }

    const handleChangeCheckbox = (event) => {
        if (event.currentTarget.checked) {
            setAccurateSearch(true)
        } else {
            setAccurateSearch(false)
        }
    }

    return <div className={searchFormCss.searchWrapper}>
        <form onSubmit={handleSubmit} className={searchFormCss.search}>
            <div className={searchFormCss.input}>
                <input className={isInput && searchFormCss.active} type={"text"} placeholder={placeholder}
                       value={isInput}
                       onChange={handleChangeValue}
                       onKeyDown={handleKeyPress}/>
                {isInput && <img onClick={handleClickTrash} src={trash} alt={"cross"} className={searchFormCss.cross}/>}
            </div>
            <button type={"submit"}>Найти</button>
        </form>
        <input id={"accurateSearch"} onChange={handleChangeCheckbox} type={"checkbox"}
               className={searchFormCss.accurateSearch}/>
        <label htmlFor={"accurateSearch"}>Точный поиск</label>
    </div>
}

const mapStateToProps = (state) => {
    return {
        placeholder: state.findBrandReducer.placeholder,
        categories: state.findBrandReducer.categories
    }
}

const mapDispatchToProps = {
    searchItems,
    setErrorMessage,
    chooseCategory,
    setSearchValue,
    setAccurateSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
