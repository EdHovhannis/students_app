import React from 'react'

const AlertMessage = (props) => {
    return (
        <div className={ props.variant==="two" ? "alert alert-danger text-center":props.variant==="tree"?"alert alert-primary text-center mt-5 w-75 mx-auto" : " p-3 alert-primary text-center"} role="alert">
                {props.children}
        </div>
    )
}

export default AlertMessage
