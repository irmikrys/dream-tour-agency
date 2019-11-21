export interface Trip {
  id: number;
  nazwa: string;
  kraj: string;
  startDate: Date;
  endDate: Date;
  cena: number;
  maxMiejsc: number;
  miejsc?: number;
  opis: string;
  zdjecie: string;
}
