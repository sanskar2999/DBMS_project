import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    address: {
      country: 'India',
      state: 'Madhya Pradesh',
      city: 'Indore',
      street: 'Gumasta Nagar'
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: '123@gmail.com',
    name: 'Sambhav K Bhandari',
    phone: '9898989899'
  },
  {
    id: uuid(),
    address: {
      country: 'India',
      state: 'Uttar Pradesh',
      city: 'Gorakhpur',
      street: 'Sudama Nagar'
    },
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1555016400000,
    email: '123@gmail.com',
    name: 'Sanskar Agrawal',
    phone: '9898989899'
  },
  {
    id: uuid(),
    address: {
      country: 'India',
      state: 'Bihar',
      city: 'Patna',
      street: 'Patliputra'
    },
    avatarUrl: '/static/images/avatars/avatar_8.png',
    createdAt: 1555016400000,
    email: '123@gmail.com',
    name: 'Shivam',
    phone: '9898989899'
  }
  
];
