import React, { useState } from 'react';
import { useFormik } from 'formik';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import * as Yup from 'yup';
import '../App.css';

const RegistrationForm = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [isLoading, setLoading] = useState(false);
    // Create formik Hook:
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
                .required('Verplicht veld'),
            lastname: Yup.string()
                .required('Verplicht veld'),
            zip: Yup.string()
                .required('Verplicht veld')
                .matches(/^\d{4} ?[a-z]{2}$/i, {message: 'Ongeldige postcode'}),
            email: Yup.string()
                .required('Verplicht veld')
                .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, {message: 'Ongeldig e-mailadres'}),
        }),
        onSubmit: values => {
            postDetails(values, street, city)
        },
    });

    // GET street and address after entering ZIP and Number (postcode.tech)
    const getAddress = async (zip, number) => {
        try {
            const response = await axios.get(`https://postcode.tech/api/v1/postcode?postcode=${zip}&number=${number}`, {
                headers: {
                    'Authorization': 'Bearer 2a79baa3-f990-401c-b842-18a5ce6312a9'
                }
            })
            setStreet(response.data.street)
            setCity(response.data.city)
        } catch (error) { 
            console.log("error", error)
        }
    };

    // Post details to dummy container/url (pipedream)
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
            NotificationManager.success('You hebt je ingeschreven!', 'Succes!!', 2000);
            formik.resetForm()
            setCity('')
            setStreet('')
            return data // creates an in-browser notification on succes
        } catch(error) {
            console.log("error", error);
            NotificationManager.error('Fout bij de inschrijving!', 'Probeer opnieuw!'); // creates an error notification on failure
        }
    }

    return (
        <div className="registration-form d-flex flex-column">
            <h1>Schrijf je in</h1>
            <form onSubmit={formik.handleSubmit} >
                <input
                className="form-control mt-3"
                name="initials"
                type="text"
                placeholder="Voorletters"
                {...formik.getFieldProps('initials')} // replaces Onchange, Onblur and Value
                /> 
                {formik.touched.initials && formik.errors.initials ? (<div className="font-weight-bold">{formik.errors.initials}</div>) : null }
                <input
                className="form-control mt-3"
                name="insertion"
                type="text"
                placeholder="Tussenvoegsel"
                {...formik.getFieldProps('insertion')}
                />
                <input
                className="form-control mt-3"
                name="lastname"
                type="text"
                placeholder="Achternaam"
                {...formik.getFieldProps('lastname')}
                />
                {formik.touched.lastname && formik.errors.lastname ? (<div className="font-weight-bold">{formik.errors.lastname}</div>) : (null)}

                <input
                className="form-control mt-3"
                name="zip"
                type="text"
                placeholder="Postcode"
                {...formik.getFieldProps('zip')}
                />
                {formik.touched.zip && formik.errors.zip ? (<div className="font-weight-bold">{formik.errors.zip}</div>) : (null)}
                
                <input
                className="form-control mt-3"
                name="number"
                type="number"
                placeholder="Huisnummer"
                {...formik.getFieldProps('number')}
                onBlur={() => { getAddress(formik.values.zip, formik.values.number) }}
                />
                {formik.touched.number && formik.errors.number ? (<div className="font-weight-bold">{formik.errors.number}</div>) : (null)}

                <input
                className="form-control mt-3"
                name="streetname"
                type="text"
                placeholder="Straatnaam"
                {...formik.getFieldProps('streetname')}
                value={formik.values.streetname || street}
                />

                <input
                className="form-control mt-3"
                name="city"
                type="text"
                placeholder="Stad"
                {...formik.getFieldProps('city')}
                value={formik.values.city || city} 
                />

                <input
                className="form-control mt-3"
                name="email"
                type="text"
                placeholder="Email"
                {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (<div className="font-weight-bold">{formik.errors.email}</div>) : (null)}

                { isLoading ? (
                <button className="btn btn-primary mt-3" type="submit" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Laden...
                </button>
                ) : (
                <button className="btn btn-primary mt-3" type="submit">Verzenden</button>) }
            </form>
        </div>
    );
};

export default RegistrationForm;