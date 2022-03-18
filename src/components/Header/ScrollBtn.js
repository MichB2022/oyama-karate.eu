import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import NavItems from './NavItems';
import styles from './ScrollBtn.module.scss';

const ScrollBtn = ({
  items,
  hamburgerIcon,
  closeIcon,
  isScrollButtonVisible
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDropdownOpen]);

  return (
    <>
      <CSSTransition
        in={isScrollButtonVisible}
        timeout={(200, 0)}
        classNames={styles.navScrollAnim}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div
          className={styles.navScroll}
          ref={nodeRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className={styles.navIcon}>
            {!isDropdownOpen && hamburgerIcon}
          </div>
        </div>
      </CSSTransition>

      {isDropdownOpen && (
        <div className={styles.scrollDropdown}>
          <div
            className={styles.closeIcon}
            onClick={() => setIsDropdownOpen(false)}
          >
            {closeIcon}
          </div>
          <NavItems
            items={items}
            className={styles.navLinks}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </div>
      )}
    </>
  );
};

export default ScrollBtn;
