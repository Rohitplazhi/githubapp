import axios from 'axios';
export const LIST_MANAGER='LIST_MANAGER';
export const SEARCH_TYPES='SEARCH_TYPES';
export const ADD_MANAGER='ADD_MANAGER';
export const listManager=()=>({
    type:LIST_MANAGER,
});

export const addManager=(manager)=>({
  type:ADD_MANAGER,
  payload:manager
});


export const searchTypes=(radioSelect,typeName,page,perPage)=>{
    return (dispatch) => {
        const url = 'https://api.github.com/search/'+radioSelect+'?q='+typeName+'&page='+page+'&per_page='+perPage;
        axios.get(url)
        .then(res => {
         dispatch({
          type:SEARCH_TYPES,
          payload:res
         })
        })
        .catch(error=>{
            console.log(error)
        })
      };
};


