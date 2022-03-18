export const sections = [
  {
    id: 'LIGOTA',
    title: 'Katowice Ligota',
    imageUrl:
      'http://www.koyama.pl/images/zdjecia/GLOBALNE/Seminarium_instr_07marz.jpg',
    description: (
      <p>
        LIGOTA. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        posuere, ante quis finibus efficitur, purus est porttitor justo, ut
        consequat erat eros ac velit. Fusce elementum pretium fringilla. Etiam
        accumsan accumsan condimentum. Cras tincidunt augue purus, sit amet
        facilisis leo placerat ac. Nam eleifend, est et lobortis elementum, nunc
        nisl.
      </p>
    ),
    address: 'Szkoła podstawowa nr 35 - ul. Zielonogórska 23, Katowice',
    days: ['Wtorki', 'Czwartki'],
    groups: [
      {
        name: 'Dzieci',
        schedule: [
          {
            day: 'Wtorki',
            hours: '17:30 - 18:30'
          },
          {
            day: 'Czwartki',
            hours: '17:30 - 18:30'
          }
        ]
      },
      {
        name: 'Młodzież i starsi',
        schedule: [
          {
            day: 'Wtorki',
            hours: '18:30 - 20:30'
          },
          {
            day: 'Czwartki',
            hours: '18:30 - 20:30'
          }
        ]
      }
    ],
    googleMaps: (
      <iframe
        title='Ligota'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d392.86523065658696!2d18.97603096646758!3d50.22173116920106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716cebfbfd44289%3A0x6a7ebe639b156f0d!2sSzko%C5%82a%20Podstawowa%20nr.%2035!5e0!3m2!1spl!2spl!4v1643807465013!5m2!1spl!2spl'
        width='100%'
        height='100%'
        allowFullScreen=''
        loading='lazy'
      ></iframe>
    )
  },
  {
    id: 'KOKOCINIEC',
    title: 'Katowice Kokociniec',
    imageUrl:
      'http://www.koyama.pl/images/zdjecia/GLOBALNE/Z_Oyam_w_Wieliczce.jpg',
    description: (
      <p>
        KOKOCINIEC. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque posuere, ante quis finibus efficitur, purus est porttitor justo,
        ut consequat erat eros ac velit. Fusce elementum pretium fringilla.
        Etiam accumsan accumsan condimentum. Cras tincidunt augue purus, sit
        amet facilisis leo placerat ac. Nam eleifend, est et lobortis elementum,
        nunc nisl.
      </p>
    ),
    address: 'Szkoła podstawowa nr 67 - ul. Zielona 5, Katowice',
    days: ['Poniedziałki', 'Środy'],
    groups: [
      {
        name: 'Dzieci',
        schedule: [
          {
            day: 'Poniedziałki',
            hours: '18:00 - 19:30'
          },
          {
            day: 'Środy',
            hours: '17:15 - 18:45'
          }
        ]
      },
      {
        name: 'Młodzież i starsi',
        schedule: [
          {
            day: 'Poniedziałki',
            hours: '18:00 - 19:30'
          },
          {
            day: 'Środy',
            hours: '17:15 - 18:45'
          }
        ]
      }
    ],
    googleMaps: (
      <iframe
        title='Kokociniec'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2552.069237253682!2d18.956615215707053!3d50.23461141077465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce9cfc50b7c9%3A0xbaa3d47ca13c1053!2sSzko%C5%82a%20Podstawowa%20Nr%2067%20z%20Oddzia%C5%82ami%20Integracyjnymi%20im.%20Komisji%20Edukacji%20Narodowej!5e0!3m2!1spl!2spl!4v1643807679826!5m2!1spl!2spl'
        width='100%'
        height='100%'
        allowFullScreen=''
        loading='lazy'
      ></iframe>
    )
  },
  {
    id: 'PODLESIE',
    title: 'Katowice Podlesie',
    imageUrl:
      'http://www.oyamawroclaw.pl/wp-content/uploads/2019/12/IMG_2227.jpg',
    description: (
      <p>
        PODLESIE. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque posuere, ante quis finibus efficitur, purus est porttitor justo,
        ut consequat erat eros ac velit. Fusce elementum pretium fringilla.
        Etiam accumsan accumsan condimentum. Cras tincidunt augue purus, sit
        amet facilisis leo placerat ac. Nam eleifend, est et lobortis elementum,
        nunc nisl.
      </p>
    ),
    address: 'MDK Katowice Południe - ul. Sołtysia 25, Katowice',
    days: ['Poniedziałki'],
    groups: [
      {
        name: 'Przedszkolaki (4-6 lat)',
        schedule: [
          {
            day: 'Poniedziałki',
            hours: '15:20 - 16:00'
          }
        ]
      },
      {
        name: 'Dzieci',
        schedule: [
          {
            day: 'Poniedziałki',
            hours: '16:00 - 17:00'
          }
        ]
      }
    ],
    googleMaps: (
      <iframe
        title='Podlesie'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40854.73049110271!2d18.944463729858402!3d50.2093592208559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716cecee075388f%3A0x6960238f47a4b276!2sMiejski%20Dom%20Kultury%20%22Po%C5%82udnie%22%20w%20Katowicach%20-%20Piotrowicach!5e0!3m2!1spl!2spl!4v1643809277610!5m2!1spl!2spl'
        width='100%'
        height='100%'
        allowFullScreen=''
        loading='lazy'
      ></iframe>
    )
  },
  {
    id: 'GLIWICE',
    title: 'Gliwice',
    imageUrl:
      'http://www.oyamawroclaw.pl/wp-content/uploads/2019/12/IMG_2227.jpg',
    description: (
      <p>
        GLIWICE. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque posuere, ante quis finibus efficitur, purus est porttitor justo,
        ut consequat erat eros ac velit. Fusce elementum pretium fringilla.
        Etiam accumsan accumsan condimentum. Cras tincidunt augue purus, sit
        amet facilisis leo placerat ac. Nam eleifend, est et lobortis elementum,
        nunc nisl.
      </p>
    ),
    address: 'Szkoła podstawowa nr 28 - ul. M. Strzody 4, Gliwice',
    days: ['Wtorki', 'Piątki'],
    groups: [
      {
        name: 'Dzieci',
        schedule: [
          {
            day: 'Wtorki',
            hours: '18:00 - 19:30'
          },
          {
            day: 'Piątki',
            hours: '18:00 - 19:30'
          }
        ]
      },
      {
        name: 'Młodzież i starsi',
        schedule: [
          {
            day: 'Wtorki',
            hours: '18:00 - 19:30'
          },
          {
            day: 'Piątki',
            hours: '18:00 - 19:30'
          }
        ]
      }
    ],
    googleMaps: (
      <iframe
        title='Gliwice'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1540.2524319392696!2d18.67112752933099!3d50.29303558961911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471130ff1be1498f%3A0x34685a67d45e900c!2sSzko%C5%82a%20Podstawowa%20nr%2028!5e0!3m2!1spl!2spl!4v1642958476522!5m2!1spl!2spl'
        width='100%'
        height='100%'
        allowFullScreen=''
        loading='lazy'
      ></iframe>
    )
  }
];
