import Link from 'next/link';
import { Fragment, useState } from 'react';
import styles from './Header.module.scss';

const NavItems = ({
  items,
  className,
  expandedNavLinks,
  isDropdownOpen,
  setIsDropdownOpen,
  onMouseEnterSetDropdown
}) => {
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const navItems = [];
  for (const item of items) {
    const { title, to, icon, subItems } = item;

    const expandDropdown = () => {
      if (!subItems) {
        setIsSubDropdownOpen(false);
        if (setIsDropdownOpen) {
          setIsDropdownOpen(!isDropdownOpen);
        }
      } else {
        setIsSubDropdownOpen(!isSubDropdownOpen);
      }
    };

    const linkInsideHTML = (
      <>
        <div className={styles.navTitle}>{title}</div>
        {icon ? <div className={styles.navIcon}>{icon}</div> : ''}
      </>
    );

    navItems.push(
      <Fragment key={`navitems-${title}`}>
        {!subItems && (
          <Link href={to}>
            <a onClick={expandDropdown} className={styles.navLink}>
              <div onClick={expandDropdown} className={styles.navLink}>
                {linkInsideHTML}
              </div>
            </a>
          </Link>
        )}
        {subItems && (
          <div
            onClick={expandDropdown}
            onMouseEnter={() => expandedNavLinks && setIsSubDropdownOpen(true)}
            onMouseLeave={() => expandedNavLinks && setIsSubDropdownOpen(false)}
            className={styles.navLink}
          >
            {linkInsideHTML}
          </div>
        )}

        {subItems && isSubDropdownOpen && (
          <NavItems
            items={subItems}
            className={styles.navLinkDropdown}
            expandedNavLinks={expandedNavLinks}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            onMouseEnterSetDropdown={setIsSubDropdownOpen}
          />
        )}
      </Fragment>
    );
  }

  return (
    <div
      className={className}
      onMouseEnter={() =>
        expandedNavLinks && onMouseEnterSetDropdown !== undefined
          ? onMouseEnterSetDropdown(true)
          : ''
      }
      onMouseLeave={() =>
        expandedNavLinks && onMouseEnterSetDropdown !== undefined
          ? onMouseEnterSetDropdown(false)
          : ''
      }
    >
      {navItems}
    </div>
  );
};

export default NavItems;
