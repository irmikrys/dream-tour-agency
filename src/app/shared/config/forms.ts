export const registerFormConfig = [
  {
    placeholder: 'Name',
    type: 'text',
    formControlName: 'name',
    errors: [{
      code: 'required',
      message: 'Name is required'
    }]
  },
  {
    placeholder: 'Surname',
    type: 'text',
    formControlName: 'surname',
    errors: [{
      code: 'required',
      message: 'Surname is required'
    }]
  },
  {
    placeholder: 'Email',
    type: 'text',
    formControlName: 'email',
    errors: [{
      code: 'required',
      message: 'Email is required'
    }, {
      code: 'email',
      message: 'Email must be valid'
    }]
  },
  {
    placeholder: 'Password',
    type: 'password',
    formControlName: 'password',
    errors: [{
      code: 'required',
      message: 'Password is required'
    }, {
      code: 'minlength',
      message: 'Password must be at least 6 characters long'
    }]
  }
];

export const loginFormConfig = [
  {
    placeholder: 'Email',
    type: 'text',
    formControlName: 'email',
    errors: [{
      code: 'required',
      message: 'Email is required'
    }, {
      code: 'email',
      message: 'Email must be valid'
    }]
  },
  {
    placeholder: 'Password',
    type: 'password',
    formControlName: 'password',
    errors: [{
      code: 'required',
      message: 'Password is required'
    }]
  }
];

export const tripFormConfig = [
  {
    placeholder: 'Name',
    type: 'text',
    formControlName: 'name',
    errors: [{
      code: 'required',
      message: 'Name is required'
    }]
  },
  {
    placeholder: 'Country',
    type: 'text',
    formControlName: 'country',
    errors: [{
      code: 'required',
      message: 'Country is required'
    }]
  },
  {
    placeholder: 'Price',
    type: 'text',
    formControlName: 'price',
    errors: [{
      code: 'required',
      message: 'Price is required'
    }]
  },
  {
    placeholder: 'Currency',
    type: 'text',
    formControlName: 'currency',
    errors: [{
      code: 'required',
      message: 'Currency is required'
    }]
  },
  {
    placeholder: 'Max places',
    type: 'text',
    formControlName: 'maxPlaces',
    errors: [{
      code: 'required',
      message: 'Maximum places count is required'
    }]
  },
  {
    placeholder: 'Picture link',
    type: 'text',
    formControlName: 'pictureLink',
    errors: []
  }
];
