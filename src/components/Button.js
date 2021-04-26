import React from 'react';

const Button = ({isLoading}) => {
    return (
        <div>
            { isLoading ? (
                    <button className="btn btn-primary mt-3" type="submit" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Laden...
                    </button>
                    ) : (
                    <button className="btn btn-primary mt-3" type="submit">Verzenden</button>) }
        </div>
    );
};

export default Button;