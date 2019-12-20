export const navbarLeftRoutes = [{
  link: '/',
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
  link: '/purchases',
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
