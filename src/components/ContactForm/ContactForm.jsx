import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export default function ContactForm ({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const contactNameId = nanoid();
    const contactNumberId = nanoid();

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        
        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                    break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ name: name, number: number });
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
        };
    
    return (
            <form className={css.form} onSubmit={handleSubmit}>
                <label className={css.label} htmlFor={contactNameId}>
                    Name
                </label>
                    <input
                        className={css.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        value={name}
                        onChange={handleChange}
                        id={contactNameId}
                        required
                    />
                <label className={css.label} htmlFor={contactNameId}>
                    Number
                </label>
                    <input
                        className={css.input}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        value={number}
                        onChange={handleChange}
                        id={contactNumberId}
                        required
                    /> 
                <button className={css.button}  type='submit'>
                    Add contact
                </button>
            </form>
        );
    };

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};