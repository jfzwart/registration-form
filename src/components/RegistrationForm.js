import { useFormik } from 'formik';
import React from 'react';

const validate = values => {
    const errors = {}; //sets errors as an empty object

    if (!values.initials) {
        errors.initials = 'Verplicht';
    } // return an error if initials are empty

    if (!values.lastname) {
        errors.lastname = 'Verplicht';
    }

    if (!values.zip) {
        errors.zip = 'Verplicht';
    } else if ( !/^\d{4} ?[a-z]{2}$/i.test(values.zip)) {
        errors.zip = 'Ongeldige postcode'
    }

    if (!values.number) {
        errors.number = 'Verplicht';
    } // type number is already required through the form

    if (!values.email) {
        errors.email = 'Verplicht';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Ongeldig email adres'
    }

    return errors;
};

const RegistrationForm = () => {
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
        validate,
        onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="d-flex flex-column justify-content-center col-6">
            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="insertion">Voorletters</label>
                <input
                id="initials"
                name="initials"
                type="text"
                placeholder="Voorletters"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.initials}
                />
                {formik.touched.initials && formik.errors.initials ? (<div className="form-text text-muted">{formik.errors.initials}</div>) : null }

                <label htmlFor="insertion">Tussenvoegsel</label>
                <input
                id="insertion"
                name="insertion"
                type="text"
                placeholder="Tussenvoegsel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.insertion}
                />

                <label htmlFor="lastname">Achternaam</label>
                <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Achternaam"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname ? (<div>{formik.errors.lastname}</div>) : (null)}

                <label htmlFor="zip">Postcode</label>
                <input
                id="zip"
                name="zip"
                type="text"
                placeholder="Postcode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zip}
                />
                {formik.touched.zip && formik.errors.zip ? (<div>{formik.errors.zip}</div>) : (null)}

                <label htmlFor="number">Huisnummer</label>
                <input
                id="number"
                name="number"
                type="number"
                placeholder="Huisnummer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
                />
                {formik.touched.number && formik.errors.number ? (<div>{formik.errors.number}</div>) : (null)}

                <label htmlFor="streetname">Straatnaam</label>
                <input
                id="streetname"
                name="streetname"
                type="text"
                placeholder="Straatnaam"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetname}
                />
                <label htmlFor="city">Stad</label>
                <input
                id="city"
                name="city"
                type="text"
                placeholder="Stad"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                />
                <label htmlFor="email">Email</label>
                <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : (null)}

                <button type="submit">Versturen</button>
            </form>
        </div>
    );
};

export default RegistrationForm;