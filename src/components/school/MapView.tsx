// import React from 'react';
// import { Box, Text } from '@chakra-ui/react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { NCESSchoolFeatureAttributes } from '@utils/nces';
// import { googleMapsKey } from '@utils/maps';

// // Props for the map component
// interface MapViewProps {
//     schools: NCESSchoolFeatureAttributes[];
//     selectedSchool: NCESSchoolFeatureAttributes | null;
// }

// const MapView = ({ schools, selectedSchool }: MapViewProps) => {
//     const validSchools = schools.filter(school => 
//         school.LAT && school.LON && 
//         !isNaN(school.LAT) && !isNaN(school.LON)
//     );

//     const lat = selectedSchool?.LAT ?? validSchools[0]?.LAT ?? 47.6062;
//     const lng = selectedSchool?.LON ?? validSchools[0]?.LON ?? -122.3321;

//     const center = { lat, lng };

//     return (
//         <Box height="400px" width="100%" borderRadius="md" overflow="hidden">
//             <LoadScript googleMapsApiKey={googleMapsKey}>
//                 <GoogleMap
//                     mapContainerStyle={{ width: '100%', height: '100%' }}
//                     center={center}
//                     zoom={12}
//                 >
//                     {validSchools.map(school => (
//                         <Marker
//                             key={school.NCESSCH}
//                             position={{
//                                 lat: school.LAT ?? 0,
//                                 lng: school.LON ?? 0
//                             }}
//                             title={school.NAME ?? ''}
//                         />
//                     ))}
//                 </GoogleMap>
//             </LoadScript>
//         </Box>
//     );
// };


// export default MapView;

// src/components/school/MapView.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { NCESSchoolFeatureAttributes } from '@utils/nces';
import { googleMapsKey } from '@utils/maps';

interface MapViewProps {
  schools: NCESSchoolFeatureAttributes[];
  selectedSchool: NCESSchoolFeatureAttributes | null;
}

const MapView = ({ schools, selectedSchool }: MapViewProps) => {
  const valid = schools.filter(
    (s) => s.LAT && s.LON && !isNaN(s.LAT) && !isNaN(s.LON),
  );

  const center = {
    lat: selectedSchool?.LAT ?? valid[0]?.LAT ?? 47.6062,
    lng: selectedSchool?.LON ?? valid[0]?.LON ?? -122.3321,
  };

  return (
    <Box h="100%" w="100%" borderRadius="md" overflow="hidden">
      <LoadScript googleMapsApiKey={googleMapsKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={12}
          options={{ gestureHandling: 'cooperative' }} // scroll-wheel no longer zooms
        >
          {valid.map((s) => (
            <Marker
              key={s.NCESSCH}
              position={{ lat: s.LAT!, lng: s.LON! }}
              title={s.NAME ?? ''}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default MapView;
