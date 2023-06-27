export interface Location {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface DateAge {
  date: string;
  age: number;
}

export interface ID {
  name: string;
  value: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: Location;
  email: string;
  login: Login;
  dob: DateAge;
  registered: DateAge;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}
