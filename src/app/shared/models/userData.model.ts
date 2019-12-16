import {AuthData} from './authData.model';

export interface UserData extends AuthData {
  name: string;
  surname: string;
}
