import styles from './Loader.module.scss';

const SpinnerPage = () => {
  return (
    <>
      <div className={styles.loaderContainer}>
        <div
          className={`${styles.spinnerGrow} ${styles.textDanger}`}
          role='status'
        >
          <span className={styles.srOnly}>Loading...</span>
        </div>
        {/* <div
          className={`${styles.spinnerGrow} ${styles.textDanger}`}
          role='status'
        >
          <span className={styles.srOnly}>Loading...</span>
        </div>
        <div
          className={`${styles.spinnerGrow} ${styles.textDanger}`}
          role='status'
        >
          <span className={styles.srOnly}>Loading...</span>
        </div> */}
        {/* <div className='spinner-grow text-danger' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <div className='spinner-grow text-danger' role='status'>
          <span className='sr-only'>Loading...</span>
        </div> */}
      </div>
    </>
  );
};

export default SpinnerPage;
