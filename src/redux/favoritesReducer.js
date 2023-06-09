import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../API";

export const ITEMS_ON_PAGE = 5
export const SHOWING_PAGES = 5

export const fetchVacanciesById = createAsyncThunk(
    "favorites/fetchVacanciesById",
    async ({ids, page, itemsOnPage}, {rejectWithValue, dispatch}) => {
        const response = await userAPI.fetchVacanciesById(ids, page, itemsOnPage)
        if (response.status === 200){
            dispatch(setFetchingFavs(false))
            dispatch(setFavVacancies(response.data))
            return response
        }
        else{
            dispatch(setFetchingFavs(false))
            rejectWithValue(Error("Error occured."))
        }
    }
)

export const favoritesReducer = createSlice({
    name: "favorites",
    initialState: {
        page: 1,
        totalPages: 0,
        vacancies: [],
        isFetching: false,
    },
    reducers: {
        setFavVacancies: (state, action) => {
            state.vacancies = action.payload.objects
            state.totalPages = Math.ceil(action.payload.total / ITEMS_ON_PAGE)
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setFetchingFavs: (state, action) => {
            state.isFetching = action.payload
        }
    }
})

export const {setFavVacancies, setPage, setFetchingFavs} = favoritesReducer.actions

export default favoritesReducer.reducer;
