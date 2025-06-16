import React from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { NCESSchoolFeatureAttributes as Sch } from '@utils/nces';
import { googleMapsKey } from '@utils/maps';

interface MapViewProps {
  school: Sch; // Only one school now
}

const MapView = ({ school }: MapViewProps) => {
  // Check if school has valid coordinates
  const hasCoords = school?.LAT && school?.LON && !isNaN(school.LAT) && !isNaN(school.LON);

  // Default to Seattle if coordinates are missing
  const center = hasCoords
    ? { lat: Number(school.LAT), lng: Number(school.LON) }
    : { lat: 47.6062, lng: -122.3321 };

  return (
    <Box h="100%" w="100%" borderRadius="md" overflow="hidden">
      <LoadScript googleMapsApiKey={googleMapsKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={12}
          options={{ gestureHandling: 'cooperative' }}
        >
          {hasCoords && (
            <Marker
              position={{ lat: Number(school.LAT), lng: Number(school.LON) }}
              title={school.NAME ?? ''}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default MapView;
