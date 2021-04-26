import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import * as Yup from 'yup';
import TextField from './TextField';
import Button from './Button';
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
            return data // creates an in-browser notification on success
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
            onSubmit={ (values, {resetForm}) => {
                postDetails(values, street, city)
                resetForm({ values: ''})
                setCity('')
                setStreet('')
            }}
        >
            {(formik) => (
                <div className="registration-form d-flex flex-column mt-5">
                    <h1>Schrijf je in</h1>
                    <Form>
                        <TextField // Uses TextField Component to render field and error
                            name="initials"
                            type="text"
                            placeholder="Initialen"
                        />
                        <TextField
                            name="insertion"
                            type="text"
                            placeholder="Tussenvoegsel"
                        />
                        <TextField
                            name="lastname"
                            type="text"
                            placeholder="Achternaam"
                        />
                        <TextField
                            name="zip"
                            type="text"
                            placeholder="Postcode"
                        />
                        <TextField
                            name="number"
                            type="number"
                            placeholder="Huisnummer"
                            onBlur={() => { getAddress(formik.values.zip, formik.values.number) }} // calls address API 
                        />
                        <TextField
                            name="streetname"
                            type="text"
                            placeholder="Straatnaam"
                            value={formik.values.streetname || street}
                        />
                        <TextField
                            name="city"
                            type="text"
                            placeholder="Stad"
                            value={formik.values.city || city}
                        />
                        <TextField
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                        <Button isLoading={isLoading} />
                    </Form>
                </div>
            )}
        </Formik>
    )
}

export default RegistrationForm;