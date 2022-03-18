import Button from '../Button/Button';
import styles from './ContactForm.module.scss';

const onBtnClick = (e) => {
  e.preventDefault();
  console.log(e);
};

function ContactForm({ animation, btnAnimation }) {
  return (
    <form className={styles.contactForm}>
      <Input
        classes={styles.contactInputNormal}
        placeholder={'Twoje imię...'}
        label={'Twoje imię'}
        animation={animation}
      />
      <Input
        classes={styles.contactInputNormal}
        placeholder={'E-mail...'}
        label={'E-mail'}
        animation={animation}
      />
      <Input
        classes={styles.contactInputNormal}
        placeholder={'Numer telefonu...'}
        label={'Numer telefonu'}
        animation={animation}
      />
      <label data-aos={animation}>
        <p>Wiadomość</p>
        <textarea
          className={styles.contactInputBig}
          placeholder={'Wiadomość...'}
        />
      </label>

      <div className={styles.buttonContainer}>
        <Button
          text='Wyślij formularz'
          onClick={onBtnClick}
          animation={btnAnimation}
        />
      </div>
    </form>
  );
}

const Input = ({ classes, placeholder, label, animation }) => {
  return (
    <label data-aos={animation}>
      <p>{label}</p>
      <input type='text' className={classes} placeholder={placeholder} />
    </label>
  );
};

export default ContactForm;
