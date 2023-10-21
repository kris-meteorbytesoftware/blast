export interface LandmineModel {
  id: number;
  businessId: number;
  active: string;
  lat: number;
  lng: number;
  image: string;
  expirationDate: string;
  url: string;
  distance: number;
  createdBy: string;

  imageUrl: string;
  name: string;
}
