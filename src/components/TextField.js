import React from 'react';
import { useField } from 'formik';

const TextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input className="form-control mt-3" {...field} {...props} />
            {meta.touched && meta.error ? (
            <div className="font-weight-bold">{meta.error}</div>
            ) : null}
        </>
        );
    };


export default TextField;