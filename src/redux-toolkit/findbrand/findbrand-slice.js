import {createSlice} from "@reduxjs/toolkit";
import {transfromTextToMin} from "../../help-functions/help-functions";
import cosmeticsDatabaseImport from "./cosmeticsDatabase";

const initialState = {
    cosmeticsDatabase: cosmeticsDatabaseImport,
    searchResult: [],
    filterResult: [],
    errorMessage: "",
    placeholder: "Введите значение...",
    categories: {
        current: "all",
        all: "all",
        article: "articleNumber",
        brand: "brand",
        line: "line",
        name: "name"
    },
    searchValue: "",
    isFilterChecked: false,
    isAccurateSearch: false
};

const findBrandSlice = createSlice({
    name: "findBrandSlice",
    initialState,
    reducers: {
        searchItems: (state) => {
            const valueForSearch = transfromTextToMin(state.searchValue);

            let result = [];
            let isFound = false;

            for (const item of state.cosmeticsDatabase) {
                for (const key of Object.keys(item)) {
                    if (key !== "room" && key !== "row" && key !== "description" && key !== "photo" && key !== "altPhoto") {
                        const valueFromBase = transfromTextToMin("" + item[key]);

                        if (valueFromBase.includes(valueForSearch)) {
                            const tempObj = {
                                articleNumber: item["articleNumber"],
                                brand: item["brand"],
                                room: item["room"],
                                row: item["row"],
                                description: item["description"],
                                line: item["line"],
                                name: item["name"],
                                photo: item["photo"],
                                altPhoto: item["altPhoto"]
                            }

                            isFound = true;
                            state.errorMessage = ""
                            result.push(tempObj);
                        }
                    }
                }
            }

            if (!isFound) {
                state.errorMessage = "Упс, что-то пошло не так... ((("
            }

            state.searchResult = result;
            state.filterResult = result;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setAccurateSearch: (state, action) => {
            state.isAccurateSearch = action.payload;
        },
        chooseCategory: (state, action) => {
            const filterCategory = action.payload;
            const filterValue = transfromTextToMin(state.searchValue);

            state.categories.current = filterCategory;

            const accurateSearch = state.isAccurateSearch;

            if (filterCategory === state.categories.all) {
                state.filterResult = state.searchResult;
                state.isFilterChecked = false;
            } else {
                state.isFilterChecked = true;
                state.filterResult = state.searchResult.filter((item) => {
                    item = transfromTextToMin("" + item[`${filterCategory}`]);
                    return !accurateSearch ? item.includes(filterValue) : item === filterValue;
                });
            }

        }
    }
})

const {reducer, actions} = findBrandSlice;

export const {searchItems, setErrorMessage, chooseCategory, setSearchValue, setAccurateSearch} = actions;

export default reducer;