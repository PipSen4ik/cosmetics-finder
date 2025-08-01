import React from 'react';

import wrapperCss from "./wrapperCss.module.scss"

const Wrapper = ({children}) => {
    return <div className={wrapperCss.container}>
        <div className={wrapperCss.content}>
            {children}
        </div>
    </div>
}

export default Wrapper;
