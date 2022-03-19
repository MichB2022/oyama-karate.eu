import styles from './GroupsAd.module.scss';
import kidsKarateImg from '../../../assets/kids-karate.jpeg';
import teenagersKarateImg from '../../../assets/karate-teenagers.jpeg';
import adultsKarateImg from '../../../assets/adults-karate.jpeg';
import familyKarateImg from '../../../assets/family-karate.jpeg';
import Link from 'next/link';

const GroupsAd = ({ animation }) => {
  return (
    <div className={styles.groupsAdList}>
      <GroupAdItem
        title='DZIECI'
        imgSrc={kidsKarateImg.src}
        XImgPosition={-26}
        animation={animation}
        to='/zajecia-karate-dla-przedszkolakow-katowice'
      />
      <GroupAdItem
        title='MŁODZIEŻY'
        imgSrc={teenagersKarateImg.src}
        XImgPosition={-3}
        animation={animation}
        to='/nasze-sekcje-karate-katowice'
      />
      <GroupAdItem
        title='DOROSŁYCH'
        imgSrc={adultsKarateImg.src}
        XImgPosition={0}
        animation={animation}
        to='/nasze-sekcje-karate-katowice'
      />
      <GroupAdItem
        title='RODZIN'
        imgSrc={familyKarateImg.src}
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
