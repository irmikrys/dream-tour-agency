import {Trip} from '../models/trip.model';

export const fakeTrips: Trip[] = [
  {
    id: 1,
    nazwa: 'Wycieczka1',
    kraj: 'Polska',
    startDate: new Date('Sep 1, 2019'),
    endDate: new Date('Sep 10, 2019'),
    cena: 100,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 1',
    zdjecie: 'https://bi.im-g.pl/im/8/9964/z9964668IH,mazury--polska--jezioro--las.jpg'
  },
  {
    id: 2,
    nazwa: 'Wycieczka2',
    kraj: 'Niemcy',
    startDate: new Date('Sep 15, 2019'),
    endDate: new Date('Sep 21, 2019'),
    cena: 450,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 2',
    zdjecie: 'https://www.bawaria.travel/data/mediadb/cms_pictures/generated/b8be73a42b08ad63a257fab36708fe4f.jpeg'
  },
  {
    id: 3,
    nazwa: 'Wycieczka3',
    kraj: 'Rosja',
    startDate: new Date('Jul 3, 2020'),
    endDate: new Date('Jun 10, 2020'),
    cena: 200,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 3',
    zdjecie: 'https://cdnpl1.img.sputniknews.com/images/74/49/744950.jpg'
  },
  {
    id: 4,
    nazwa: 'Wycieczka4',
    kraj: 'Ukraina',
    startDate: new Date('Jul 1, 2020'),
    endDate: new Date('Jul 17, 2020'),
    cena: 25,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 4',
    zdjecie: 'https://f4fcdn.eu/wp-content/uploads/2017/11/Ukraina650ST.png'
  },
  {
    id: 5,
    nazwa: 'Wycieczka5',
    kraj: 'Chorwacja',
    startDate: new Date('Aug 1, 2020'),
    endDate: new Date('Aug 13, 2020'),
    cena: 1000,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 5',
    zdjecie: 'https://www.indexpolska.com.pl/public/import_img/M_201901081442230.wycieczka_do_chorwacji_-_biuro_podrozy_index_7.jpg'
  },
  {
    id: 6,
    nazwa: 'Wycieczka6',
    kraj: 'Czarnogóra',
    startDate: new Date('Jul 6, 2020'),
    endDate: new Date('Jul 20, 2020'),
    cena: 1500,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 6',
    zdjecie: 'https://i.wpimg.pl/O/644x430/i.wp.pl/a/f/jpeg/36433/sveti_stefan.jpeg'
  },
  {
    id: 7,
    nazwa: 'Wycieczka7',
    kraj: 'Turcja',
    startDate: new Date('Jun 2, 2020'),
    endDate: new Date('Jun 22, 2020'),
    cena: 2000,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 7',
    zdjecie: 'https://swakacje.pl/no-index/hotel/turcja/orange-county-resort-alanya-basen-sport-i-rekreacja-795525345-original.jpg'
  },
  {
    id: 8,
    nazwa: 'Wycieczka8',
    kraj: 'Indonezja',
    startDate: new Date('Mar 12, 2020'),
    endDate: new Date('Mar 20, 2020'),
    cena: 7000,
    maxMiejsc: 10,
    miejsc: 10,
    opis: 'Opis wycieczki 8',
    zdjecie: 'https://www.traveligo.pl/repository/images/box_promocja/sylwia/indonezja.jpg'
  },
];
