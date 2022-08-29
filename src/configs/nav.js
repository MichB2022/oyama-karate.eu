import { AiFillCaretDown } from 'react-icons/ai';
import { TiThMenuOutline } from 'react-icons/ti';
import { VscChromeClose } from 'react-icons/vsc';
import logo from '../assets/logo.png';
import axios from 'axios';
import slugify from 'slugify';
import { API_URL } from './api';
import { sanityClient } from '../../sanity';

export const getNavConfig = async () => {
  const infoPages = await sanityClient.fetch(`
  *[_type == "infoPages"][] {
    _id,
    title,
    slug,
    seoDesc,
    seoKeyWords,
    content
  }
`);

  const navConfig = {
    styles: {
      bgColor: '',
      secondBgColor: '',
      mainTextColor: '',
      secondColorText: '',
      hoverColor: '',
      secondHoverColor: ''
    },
    logo: {
      src: logo.src,
      title: '',
      titleHTML: (
        <>
          <span className='special-text'>oyama-</span>karate
          <span className='special-text'>.</span>eu
        </>
      )
    },
    widthToShowItems: 1024,
    items: [
      {
        title: 'Nasze sekcje',
        to: '/nasze-sekcje-karate-katowice'
      },
      {
        title: 'Przedszkolaki',
        to: '/zajecia-karate-dla-przedszkolakow-katowice'
      },
      {
        title: 'Kickboxing',
        to: '/kickboxing-katowice'
      },
      {
        title: 'Informacje',
        to: '/',
        icon: true,
        subItems: [
          {
            title: 'Kalendarz',
            to: '/kalendarz-oyama-karate'
          },
          {
            title: 'Harmonogram zajęć',
            to: '/harmonogram-zajec-karate'
          },
          {
            title: 'Nasi instruktorzy',
            to: '/instruktorzy'
          },
          {
            title: 'Galerie',
            to: '/galerie'
          },
          {
            title: 'Motywatory',
            to: '/motywatory-karate'
          }
        ]
      },
      {
        title: 'Aktualności',
        to: '/wszystkie-aktualnosci'
      }
    ]
  };

  infoPages.map((element) =>
    navConfig.items
      .find((el) => el.title === 'Informacje')
      .subItems.push({
        title: element.title,
        to: `/${element.slug.current}/${element._id}`
      })
  );

  return JSON.parse(JSON.stringify(navConfig));
};
