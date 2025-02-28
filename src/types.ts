export interface Continent {
  name: string;
}

export interface Country {
  name: string;
  code: string;
  emoji: string;
  continent: Continent;
  currency: string;
}
