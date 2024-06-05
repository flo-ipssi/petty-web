import React, { useState, useEffect } from 'react';

interface AlertProps {
    type: 'success' | 'error';
    message: string;
    visible: boolean;

}

const AlertForm: React.FC<AlertProps> = ({ type, message,visible  }) => {

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setVisible(false);
    //     }, 3000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <>
            {visible && (
                <div
                    className={`${
                        type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white text-center py-2 px-4 fixed bottom-0 right-0 m-4 rounded`}
                >
                    {message}
                </div>
            )}
        </>
    );
};

export default AlertForm;