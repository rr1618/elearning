const initialState = {
    visible: false,

}
const initialState1=
    {
        visible: false,
    }
const reducer = (state=initialState, action) =>
{

    if(action.type==='MODAL'){
        console.log("store",state.visible)
        return{
            visible: !state.visible
        }
    }

    return state;
}

export  default reducer;