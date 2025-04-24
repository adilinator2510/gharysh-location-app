export interface Position {
  lat: number;
  lng: number;
}

export interface Friend {
  id: string;
  name: string;
  position: Position;
  isOnline: boolean;
}
