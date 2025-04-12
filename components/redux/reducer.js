import { ADD_TOKEN, REMOVE_TOKEN } from "./constants";

const initialState = [];
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return [...state, action.data];
        case REMOVE_TOKEN:
            return [];
        default:
            return state;
    }
}