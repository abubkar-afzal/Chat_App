import { ADD_TOKEN } from "./constants";
import { REMOVE_TOKEN } from "./constants";

export function addToken(user){
    return({
        type: ADD_TOKEN,
        data: user
    })
}
export function removeToken(user){
    return({
        type: REMOVE_TOKEN,
        data: user
    })
}