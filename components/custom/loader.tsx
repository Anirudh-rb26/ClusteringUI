import React from 'react'

const Loader = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full border-4 border-t-4 border-gray-500 w-12 h-12"></div>
        </div>
    )
}

export default Loader