import { createContext, useState, useEffect } from 'react';
import './errorContext.css';
import globals from '../Globals';

const ErrorContext = createContext({errors: [], addError: () => {}});


const ErrorManager = ({ children }) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            pruneMessages();
        }, 1); // Every 1 second update error time
    
        return () => clearTimeout(timeout);
    });

    const addError = (error) => {
        setErrors((prevErrors) => [{msg: error, time: globals.errorTimeout}, ...prevErrors]);
    }
    const pruneMessages = () => {
        setErrors((prevErrors) => {
            return prevErrors.filter((error) => {
                return error.time > 0;
            }).map((error) => {
                return {msg: error.msg, time: error.time - 1};
            });
        });
    };

    return (
        <ErrorContext.Provider value={{errors: errors, addError: addError}}>
            <div className='error-container'>
                {errors.map((error, index) => (
                    <div key={index} message={error} className='error-message'>
                        {error.msg}
                    </div>
                ))}
            </div>
            {children}
        </ErrorContext.Provider>
    );
};

export { ErrorContext, ErrorManager}