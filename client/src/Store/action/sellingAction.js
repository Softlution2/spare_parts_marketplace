export const Initialize = () => {
  return (dispatch, getState) => {  
    dispatch( {
        type: 'SELLING_INITIALIZE',
    })
    return Promise.resolve()
  }  
}
