import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../../../configs/api';
import Button from '../Button/Button';
import styles from './ContactForm.module.scss';

function ContactForm({ animation, btnAnimation }) {
  const [sent, setSent] = useState(false);

  const onBtnClick = (e) => {
    e.preventDefault();
    const name = document.getElementById('formName');
    const email = document.getElementById('formEmail');
    const phone = document.getElementById('formPhone');
    const content = document.getElementById('formContent');

    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      content: content.value
    };

    axios.post(`${API_URL}/homepage/sendemail`, data);
    setSent(true);
  };

  return (
    <form className={styles.contactForm}>
      <Input
        classes={styles.contactInputNormal}
        placeholder={'Twoje imię...'}
        label={'Twoje imię'}
        animation={animation}
        id={'formName'}
      />
      <Input
        classes={styles.contactInputNormal}
        placeholder={'E-mail...'}
        label={'E-mail'}
        animation={animation}
        id={'formEmail'}
      />
      <Input
        classes={styles.contactInputNormal}
        placeholder={'Numer telefonu...'}
        label={'Numer telefonu'}
        animation={animation}
        id={'formPhone'}
      />
      <label data-aos={animation}>
        <p>Wiadomość</p>
        <textarea
          className={styles.contactInputBig}
          placeholder={'Wiadomość...'}
          id='formContent'
        />
      </label>

      <div className={styles.buttonContainer}>
        {sent && <p>Wysłano wiadomość!</p>}
        {!sent && (
          <Button
            text='Wyślij formularz'
            onClick={onBtnClick}
            animation={btnAnimation}
          />
        )}
      </div>
    </form>
  );
}

const Input = ({ classes, placeholder, label, animation, id }) => {
  return (
    <label data-aos={animation}>
      <p>{label}</p>
      <input
        id={id}
        type='text'
        className={classes}
        placeholder={placeholder}
      />
    </label>
  );
};

export default ContactForm;
