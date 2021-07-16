import React, { Fragment } from 'react'

import loadingGifImg from "../../images/loading.gif";

const LoadingGif = () => {
    return (
        <Fragment>
            <img src={loadingGifImg} alt="loading" className="object-contain" />
        </Fragment>
    )
}

export default LoadingGif
