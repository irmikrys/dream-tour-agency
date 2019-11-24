import {Trip} from '../models/trip.model';

export const fakeTrips: Trip[] = [
  {
    id: 1,
    name: 'Wycieczka1',
    country: 'Polska',
    startDate: new Date('Sep 1, 2019'),
    endDate: new Date('Sep 10, 2019'),
    price: 100,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 1',
    pictureLink: 'https://bi.im-g.pl/im/8/9964/z9964668IH,mazury--polska--jezioro--las.jpg'
  },
  {
    id: 2,
    name: 'Wycieczka2',
    country: 'Niemcy',
    startDate: new Date('Sep 15, 2019'),
    endDate: new Date('Sep 21, 2019'),
    price: 450,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 2',
    pictureLink: 'https://www.bawaria.travel/data/mediadb/cms_pictures/generated/b8be73a42b08ad63a257fab36708fe4f.jpeg'
  },
  {
    id: 3,
    name: 'Wycieczka3',
    country: 'Rosja',
    startDate: new Date('Jul 3, 2020'),
    endDate: new Date('Jun 10, 2020'),
    price: 200,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 3',
    pictureLink: 'https://cdnpl1.img.sputniknews.com/images/74/49/744950.jpg'
  },
  {
    id: 4,
    name: 'Wycieczka4',
    country: 'Ukraina',
    startDate: new Date('Jul 1, 2020'),
    endDate: new Date('Jul 17, 2020'),
    price: 25,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 4',
    pictureLink: 'https://f4fcdn.eu/wp-content/uploads/2017/11/Ukraina650ST.png'
  },
  {
    id: 5,
    name: 'Wycieczka5',
    country: 'Chorwacja',
    startDate: new Date('Aug 1, 2020'),
    endDate: new Date('Aug 13, 2020'),
    price: 1000,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 5',
    pictureLink: 'https://www.indexpolska.com.pl/public/import_img/M_201901081442230.wycieczka_do_chorwacji_-_biuro_podrozy_index_7.jpg'
  },
  {
    id: 6,
    name: 'Wycieczka6',
    country: 'Czarnogóra',
    startDate: new Date('Jul 6, 2020'),
    endDate: new Date('Jul 20, 2020'),
    price: 1500,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 6',
    pictureLink: 'https://i.wpimg.pl/O/644x430/i.wp.pl/a/f/jpeg/36433/sveti_stefan.jpeg'
  },
  {
    id: 7,
    name: 'Wycieczka7',
    country: 'Turcja',
    startDate: new Date('Jun 2, 2020'),
    endDate: new Date('Jun 22, 2020'),
    price: 2000,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 7',
    pictureLink: 'https://swakacje.pl/no-index/hotel/turcja/orange-county-resort-alanya-basen-sport-i-rekreacja-795525345-original.jpg'
  },
  {
    id: 8,
    name: 'Wycieczka8',
    country: 'Indonezja',
    startDate: new Date('Mar 12, 2020'),
    endDate: new Date('Mar 20, 2020'),
    price: 7000,
    maxPlaces: 10,
    placesCount: 10,
    description: 'description trips 8',
    pictureLink: 'https://www.traveligo.pl/repository/images/box_promocja/sylwia/indonezja.jpg'
  },
];
