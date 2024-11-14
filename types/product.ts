type Thumbnail = {
  id: number;
  src: string;
  name: string;
};

export interface Product {
  id: string;
  thumbnail: Thumbnail;
  name: string;
  min_price: string;
  max_price: string;
  description: string;
}
