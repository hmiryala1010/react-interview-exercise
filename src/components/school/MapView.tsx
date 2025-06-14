import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { NCESSchoolFeatureAttributes } from '@utils/nces';
import { googleMapsKey } from '@utils/maps';

// Props for the map component
interface MapViewProps {
    schools: NCESSchoolFeatureAttributes[];
    selectedSchool: NCESSchoolFeatureAttributes | null;
}

const MapView = ({ schools, selectedSchool }: MapViewProps) => {
    // Filter schools with valid coordinates
    const validSchools = schools.filter(school => 
        school.LAT && school.LON && 
        !isNaN(school.LAT) && !isNaN(school.LON)
    );

    // Center map on selected school or first school
    const center = {
        lat: selectedSchool?.LAT || validSchools[0]?.LAT || 47.6062,
        lng: selectedSchool?.LON || validSchools[0]?.LON || -122.3321
    };

    return (
        <Box height="400px" width="100%" borderRadius="md" overflow="hidden">
            <LoadScript googleMapsApiKey={googleMapsKey}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={12}
                >
                    {/* Show markers for all schools */}
                    {validSchools.map(school => (
                        <Marker
                            key={school.NCESSCH}
                            position={{ 
                                lat: school.LAT!, 
                                lng: school.LON! 
                            }}
                            title={school.NAME}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </Box>
    );
};

export default MapView;