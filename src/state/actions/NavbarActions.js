export const showComponent = (componentName) => {
    return (dispatch) => {
        dispatch({
            type: "SHOW_COMPONENT",
            payload: componentName
        })
    }
}
