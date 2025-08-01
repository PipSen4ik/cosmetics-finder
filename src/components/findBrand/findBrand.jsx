import React from 'react';

import SearchForm from "../searchForm/searchForm";
import SearchResult from "../searchResult/searchResult";
import Wrapper from "../wrapper/wrapper";
import SearchResultItem from "../searchResultItem/searchResultItem";
import usePagination from "../../hook/usePagination";
import Pagination from "../pagination/pagination";
import findBrandCss from "./findBrandCss.module.scss"
import {connect} from "react-redux";

const FindBrand = ({filterResult, errorMessage, isFilterChecked}) => {
    const {
        firstIndex,
        lastIndex,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        curPage,
        setPage,
        DOTS,
        listOfPages
    } = usePagination(filterResult.length, 12);

    const renderResult = () => {
        if ((filterResult.length || (!filterResult.length && isFilterChecked)) && !errorMessage) {
            return <><SearchResult>
                {filterResult.slice(firstIndex, lastIndex).map((item, index) => {
                    return <SearchResultItem key={index} articleNumber={item.articleNumber}
                                             brand={item.brand}
                                             room={item.room}
                                             row={item.row}
                                             description={item.description} line={item.line}
                                             name={item.name}
                                             photo={item.photo} altPhoto={item.altPhoto}/>
                })}
            </SearchResult>
                {listOfPages.length > 1 &&
                    <div className={findBrandCss.pagination}>
                        <Pagination dots={DOTS} listOfPages={listOfPages}
                                    nextPage={nextPage}
                                    prevPage={prevPage} firstPage={firstPage}
                                    lastPage={lastPage}
                                    curPage={curPage} setPage={setPage}/>
                    </div>}
            </>
        } else if (errorMessage && !filterResult.length) {
            return <div className={findBrandCss.error}>{errorMessage}</div>
        }
        return null
    }

    return <Wrapper>
        <SearchForm/>
        {renderResult()}
    </Wrapper>
}

const mapStateToProps = (state) => {
    return {
        filterResult: state.findBrandReducer.filterResult,
        errorMessage: state.findBrandReducer.errorMessage,
        isFilterChecked: state.findBrandReducer.isFilterChecked
    }
}

export default connect(mapStateToProps)(FindBrand);
