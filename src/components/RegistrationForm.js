import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

// const validate = values => {
//     const errors = {}; //sets errors as an empty object

//     if (!values.initials) {
//         errors.initials = 'Verplicht';
//     } // return an error if initials are empty

//     if (!values.lastname) {
//         errors.lastname = 'Verplicht';
//     }

//     if (!values.zip) {
//         errors.zip = 'Verplicht';
//     } else if ( !/^\d{4} ?[a-z]{2}$/i.test(values.zip)) {
//         errors.zip = 'Ongeldige postcode'
//     }

//     if (!values.number) {
//         errors.number = 'Verplicht';
//     } // type number is already required through the form

//     if (!values.email) {
//         errors.email = 'Verplicht';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Ongeldig email adres'
//     }

//     return errors;
// };

//TODO: Create load indicator on button -> Done
//TODO: Add Background, Logo, META Desc
//TODO: Style error messages
//TODO: Add success notification
//TODO: Code cleanup

const RegistrationForm = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [isLoading, setLoading] = useState(false);
    // const [isOpen, setIsOpen] = useState(false);
    
    const formik = useFormik({
        initialValues: {
            initials: '',
            insertion: '',
            lastname: '',
            zip: '',
            streetname: '',
            city: '',
            number: '',
            email: ''
        },
        validationSchema: Yup.object({
            initials: Yup.string()
                .required('Verplicht'),
            lastname: Yup.string()
                .required('Verplicht'),
            zip: Yup.string()
                .required('Verplicht')
                .matches(/^\d{4} ?[a-z]{2}$/i, {message: 'Ongeldige postcode'}),
            email: Yup.string()
                .required('Verplicht')
                .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {message: 'Ongeldig e-mailadres'}),
        }),
        onSubmit: values => {
            postDetails(values, street, city)
        },
    });

    // GET street and address after entering ZIP and Number
    const getAddress = async (zip, number) => {
        try {
            const response = await axios.get(`https://postcode.tech/api/v1/postcode?postcode=${zip}&number=${number}`, {
                headers: {
                    'Authorization': 'Bearer 2a79baa3-f990-401c-b842-18a5ce6312a9'
                }
            })
            // console.log(response.data)
            setStreet(response.data.street)
            setCity(response.data.city)
        } catch (error) { 
            console.log("error", error)
        }
    };

    const postDetails = async ( values, street, city ) => {
        try {
            setLoading(true)
            const data = await axios.post(`https://136165c056a1703a60ddb0f1922c01bc.m.pipedream.net/`, {
                data: {
                    initials: values.initials,
                    insertion: values.insertion,
                    lastname: values.lastname,
                    zip: values.zip,
                    streetname: street,
                    city: city,
                    number: values.number,
                    email: values.email
                }
            })
            setLoading(false)
            console.log(data)
            // if (data.request.status == 200) isOpen(true)
        } catch(error) {
            console.log("error", error);
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center col-3">
            <form onSubmit={formik.handleSubmit} >
                {/* <label htmlFor="insertion">Voorletters</label> */}
                <input
                id="initials"
                name="initials"
                type="text"
                placeholder="Voorletters"
                {...formik.getFieldProps('initials')} 
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.initials}
                />
                {formik.touched.initials && formik.errors.initials ? (<div className="form-text text-muted">{formik.errors.initials}</div>) : null }

                <input
                id="insertion"
                name="insertion"
                type="text"
                placeholder="Tussenvoegsel"
                {...formik.getFieldProps('insertion')}
                />

                <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Achternaam"
                {...formik.getFieldProps('lastname')}
                />
                {formik.touched.lastname && formik.errors.lastname ? (<div>{formik.errors.lastname}</div>) : (null)}

                <input
                id="zip"
                name="zip"
                type="text"
                placeholder="Postcode"
                {...formik.getFieldProps('zip')}
                />
                {formik.touched.zip && formik.errors.zip ? (<div>{formik.errors.zip}</div>) : (null)}


                <input
                id="number"
                name="number"
                type="number"
                placeholder="Huisnummer"
                {...formik.getFieldProps('number')}
                onBlur={() => { getAddress(formik.values.zip, formik.values.number) }}
                />
                {formik.touched.number && formik.errors.number ? (<div>{formik.errors.number}</div>) : (null)}

                <input
                id="streetname"
                name="streetname"
                type="text"
                placeholder="Straatnaam"
                {...formik.getFieldProps('streetname')}
                value={formik.values.street || street}
                />

                <input
                id="city"
                name="city"
                type="text"
                placeholder="Stad"
                {...formik.getFieldProps('city')}
                value={formik.values.city || city} 
                />

                <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : (null)}

                { isLoading ? (
                <button className="btn btn-primary" type="submit" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Laden...
                </button>
                ) : (
                <button className="btn btn-primary" type="submit">Versturen</button>) }
            </form>
        </div>
    );
};

export default RegistrationForm;