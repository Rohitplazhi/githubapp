import {LIST_MANAGER,SEARCH_TYPES,ADD_MANAGER} from './action';
const initState={
 items:[],
 itemsList:[]
}
export const managerList=(state=initState,{type,payload})=>{
    let  itemsList=[
        {
            "full_name": "Rohit/LoginCritter",
            "private": false
        },
        {
            "full_name": "Rahul/LoginCritter",
            "private": false
        },
        {
            "full_name": "Aravind/LoginCritter",
            "private": false
        }
        ,
        {
            "full_name": "Sultan/LoginCritter",
            "private": false
        }
]
    switch(type){
        case LIST_MANAGER:
            return {...state,itemsList}

        case ADD_MANAGER:
            const result={
                "full_name": payload.login || payload.full_name,
                "private": false
            }
            itemsList =[...state.itemsList,result]
            return {...state,itemsList:itemsList}

    default:return state;
    }
}

export const searchTypes=(state=initState,{type,payload})=>{
    switch(type){
        case SEARCH_TYPES:
            return {...state,items:payload}

    default:return state;
    }
}