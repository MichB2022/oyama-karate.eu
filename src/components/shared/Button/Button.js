import styles from './Button.module.scss';

function Button({ text, onClick, animation }) {
  return (
    <div
      onClick={onClick}
      data-aos={animation}
      className={styles.buttonContainer}
    >
      <button>{text}</button>
    </div>
  );
}

export default Button;
