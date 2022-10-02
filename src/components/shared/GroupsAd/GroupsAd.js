import Link from 'next/link';
import urlBuilder from '@sanity/image-url';
import styles from './GroupsAd.module.scss';
import { sanityClient } from '../../../../sanity';

const GroupsAd = ({ animation, images }) => {
  return (
    <div className={styles.groupsAdList}>
      <GroupAdItem
        title='DZIECI'
        imgSrc={urlBuilder(sanityClient).image(images.kidsImage).url()}
        XImgPosition={-26}
        animation={animation}
        to='/zajecia-karate-dla-przedszkolakow-katowice'
      />
      <GroupAdItem
        title='MŁODZIEŻY'
        imgSrc={urlBuilder(sanityClient).image(images.teenagersImage).url()}
        XImgPosition={-3}
        animation={animation}
        to='/nasze-sekcje-karate-katowice'
      />
      <GroupAdItem
        title='DOROSŁYCH'
        imgSrc={urlBuilder(sanityClient).image(images.adultsImage).url()}
        XImgPosition={0}
        animation={animation}
        to='/nasze-sekcje-karate-katowice'
      />
      <GroupAdItem
        title='RODZIN'
        imgSrc={urlBuilder(sanityClient).image(images.familyImage).url()}
        XImgPosition={-50}
        animation={animation}
        to='/nasze-sekcje-karate-katowice'
      />
    </div>
  );
};

const GroupAdItem = ({ title, imgSrc, XImgPosition, animation, to }) => {
  return (
    <div className={styles.groupAd} data-aos={animation}>
      <Link href={to}>
        <a>
          <img
            src={imgSrc}
            alt='karate kids photo'
            style={{ objectPosition: `0px ${XImgPosition}px` }}
          />
          <div className={styles.vignette}>
            <h1>{title}</h1>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default GroupsAd;
