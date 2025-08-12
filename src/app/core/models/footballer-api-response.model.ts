export interface FootballerApiResponse {
  [p: string]: string | number | null;
  id: number;
  name: string;
  birth: string;
  height: number;
  nationality: string;
  number: number;
  position: string;
  games: number;
  goals: number;
  assists: number;
  cost: number | null;
}
