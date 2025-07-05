import type { FC } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import type { HotelGalleryImage } from '../../types/hotelDetails';

type ImageItem = HotelGalleryImage & {
  rows?: number;
  cols?: number;
};

type HotelImageGalleryProps = {
  images: ImageItem[];
};

const HotelImageGallery: FC<HotelImageGalleryProps> = ({ images }) => {
  return (
    <ImageList
      variant="quilted"
      cols={4}
      gap={8}
      sx={{
        width: '100%',
      }}
    >
      {images.map((item) => (
        <ImageListItem
          key={item.id}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            src={`${item.url}?w=400&h=400&fit=crop&auto=format`}
            srcSet={`${item.url}?w=400&h=400&fit=crop&auto=format&dpr=2 2x`}
            alt={item.url}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default HotelImageGallery;
