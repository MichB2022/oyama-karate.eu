import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getNavConfig } from '../../configs/nav';
import styling from './Header.module.scss';
import NavItems from './NavItems';
import NavLogo from './NavLogo';
import ScrollBtn from './ScrollBtn';

const Header = () => {
  const [navConfig, setNavConfig] = useState({ widthToShowItems: 768 });
  const [loader, setLoader] = useState(true);
  const [navLinksShown, setNavLinksShown] = useState(false);
  const [isHamburgerDropdownOpen, setIsHamburgerDropdownOpen] = useState(false);
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  const { styles, logo, items, widthToShowItems, hamburgerIcon, closeIcon } =
    navConfig;

  useEffect(async () => {
    setNavConfig(await getNavConfig());
    setLoader(false);
  }, []);

  useEffect(() => {
    if (isHamburgerDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isHamburgerDropdownOpen]);

  //resize handling useEffect
  useEffect(() => {
    setNavLinksDisplay(window.innerWidth);

    const handleResize = () => {
      setNavLinksDisplay(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navLinksShown) {
      setIsScrollButtonVisible(offset > 350);
    } else {
      setIsScrollButtonVisible(false);
    }
  }, [offset, navLinksShown]);

  const setNavLinksDisplay = (windowWidth) => {
    if (
      (windowWidth > widthToShowItems && navLinksShown) ||
      windowWidth < widthToShowItems
    ) {
      setNavLinksShown(false);
    } else if (windowWidth > widthToShowItems && !navLinksShown) {
      setNavLinksShown(true);
      setIsHamburgerDropdownOpen(false);
    }
  };

  if (loader) {
    return null;
  }

  const navigationStyles = {
    backgroundColor: styles.bgColor,
    color: styles.mainTextColor
  };

  return (
    <>
      <header className={styling.navigation} style={navigationStyles}>
        <nav>
          <NavLogo logo={logo} />
          {navLinksShown && (
            <NavItems
              items={items}
              className={styling.navLinks}
              expandedNavLinks={true}
            />
          )}
          {!navLinksShown &&
            generateHamburgerDropdown(
              items,
              hamburgerIcon,
              closeIcon,
              styling.navHamburger,
              isHamburgerDropdownOpen,
              setIsHamburgerDropdownOpen
            )}
        </nav>
      </header>
      {/* 
      <ScrollBtn
        items={items}
        hamburgerIcon={hamburgerIcon}
        closeIcon={closeIcon}
        isScrollButtonVisible={isScrollButtonVisible}
      /> */}
    </>
  );
};

const generateHamburgerDropdown = (
  items,
  hamburgerIcon,
  closeIcon,
  className,
  isHamburgerDropdownOpen,
  setIsHamburgerDropdownOpen
) => {
  return (
    <>
      <div
        className={className}
        onClick={() => setIsHamburgerDropdownOpen(!isHamburgerDropdownOpen)}
      >
        <div className={styling.navTitle}>Menu</div>
        <div className={styling.navIcon}>
          {isHamburgerDropdownOpen ? closeIcon : hamburgerIcon}
        </div>
      </div>
      {isHamburgerDropdownOpen && (
        <NavItems
          items={items}
          className={styling.hamburgerDropdown}
          isDropdownOpen={isHamburgerDropdownOpen}
          setIsDropdownOpen={setIsHamburgerDropdownOpen}
        />
      )}
    </>
  );
};

// Header.propTypes = {
//   navConfig: PropTypes.shape({
//     widthToShowItems: PropTypes.number.isRequired,
//     hamburgerIcon: PropTypes.node.isRequired,
//     closeIcon: PropTypes.node.isRequired,
//     styles: PropTypes.shape({
//       bgColor: PropTypes.string.isRequired,
//       secondBgColor: PropTypes.string,
//       mainTextColor: PropTypes.string.isRequired,
//       secondColorText: PropTypes.string,
//       hoverColor: PropTypes.string.isRequired,
//       secondHoverColor: PropTypes.string
//     }),
//     logo: PropTypes.shape({
//       src: PropTypes.string.isRequired,
//       title: PropTypes.string,
//       titleHTML: PropTypes.node,
//       styles: PropTypes.shape({
//         mainTextColor: PropTypes.string.isRequired,
//         secondColorText: PropTypes.string
//       })
//     }),
//     items: PropTypes.arrayOf(
//       PropTypes.oneOfType([
//         PropTypes.shape({
//           title: PropTypes.string.isRequired,
//           to: PropTypes.string.isRequired,
//           icon: PropTypes.node,
//           subItems: PropTypes.arrayOf(
//             PropTypes.oneOfType([
//               PropTypes.shape({
//                 title: PropTypes.string,
//                 to: PropTypes.string,
//                 icon: PropTypes.node
//               })
//             ])
//           )
//         })
//       ])
//     )
//   }).isRequired
// };

export default Header;
