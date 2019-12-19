export const navbarLeftRoutes = [{
  link: '/',
  inactive: true,
  span: {
    icon: 'wb_sunny',
    text: ' DreamTour'
  },
  auth: null
}, {
  link: '/new-trip',
  span: {
    icon: 'post_add',
    text: ' New Trip'
  },
  auth: true,
  admin: true
}];

export const navbarRightRoutes = [{
  link: '/confirmation',
  span: {
    icon: 'confirmation_number'
  },
  auth: true
}, {
  link: '/login',
  span: {
    icon: 'input',
    text: 'Login'
  },
  auth: false
}, {
  link: '/register',
  span: {
    icon: 'assignment_ind',
    text: 'Register'
  },
  auth: false
}];
