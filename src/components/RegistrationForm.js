import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import * as Yup from 'yup';
import '../App.css';

const RegistrationForm = () => {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [isLoading, setLoading] = useState(false);

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
            NotificationManager.success('Je hebt je ingeschreven!', 'Succes!!', 2000);
            // setCity('')
            // setStreet('')
            return data // creates an in-browser notification on succes
        } catch(error) {
            console.log("error", error);
            NotificationManager.error('Fout bij de inschrijving!', 'Probeer opnieuw!'); // creates an error notification on failure
        }
    }

    return (
        <Formik 
        initialValues={{
            initials: '',
            insertion: '',
            lastname: '',
            zip: '',
            streetname: '',
            city: '',
            number: '',
            email: ''
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={values => {
            postDetails(values, street, city)}
        }
        >

            {(formik) => (
                <div className="registration-form d-flex flex-column mt-5">
                <h1>Schrijf je in</h1>
                <Form>
                    <Field name="initials" type="text" placeholder="Initialen" className="form-control mt-3"/>
                    <ErrorMessage name="initials" className="font-weight-bold text-danger"/>

                    <Field name="insertion" type="text" placeholder="Tussenvoegsel" className="form-control mt-3"/>

                    <Field name="lastname" type="text" placeholder="Achternaam" className="form-control mt-3"/>
                    <ErrorMessage name="lastname" className="font-weight-bold text-danger"/>

                    <Field name="zip" type="text" placeholder="Postcode" className="form-control mt-3" />
                    <ErrorMessage name="zip" className="font-weight-bold text-danger"/>

                    <Field name="number" type="number" placeholder="Huisnummer" className="form-control mt-3" onBlur={() => { getAddress(formik.values.zip, formik.values.number) }}/>
                    <ErrorMessage name="number" className="font-weight-bold text-danger"/>

                    <Field name="streetname" type="text" placeholder="Straatnaam" className="form-control mt-3" value={formik.values.streetname || street}/>
                    <ErrorMessage name="zip" className="font-weight-bold text-danger"/>

                    <Field name="city" type="text" placeholder="Stad" className="form-control mt-3" value={formik.values.city || city}/>
                    <ErrorMessage name="city" className="font-weight-bold text-danger"/>

                    <Field name="email" type="text" placeholder="Email" className="form-control mt-3" />
                    <ErrorMessage name="email" className="font-weight-bold text-danger"/>

                    { isLoading ? (
                    <button className="btn btn-primary mt-3" type="submit" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Laden...
                    </button>
                    ) : (
                    <button className="btn btn-primary mt-3" type="submit">Verzenden</button>) }
                </Form>
                </div>
            )}
        </Formik>
    )
}

export default RegistrationForm;