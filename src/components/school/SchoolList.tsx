import React from 'react';
import { Box, List, Text, Divider } from "@chakra-ui/react";
import { NCESSchoolFeatureAttributes } from "@utils/nces";
import SchoolItem from './SchoolItem';
import MapView from './MapView';
 
// Props for the school list
interface SchoolListProps {
    schools: NCESSchoolFeatureAttributes[];
    selectedSchool: NCESSchoolFeatureAttributes | null;
    onSelect: (school: NCESSchoolFeatureAttributes) => void;
}

const SchoolList = ({ schools, selectedSchool, onSelect }: SchoolListProps) => {
    // Don't render anything if no schools
    if (!schools.length) return null;

    return (
        <Box>
            {/* Map view on top */}
            <MapView 
                schools={schools}
                selectedSchool={selectedSchool}
            />

            <Divider my={4} />

            {/* Schools count */}
            <Text mb={4}>
                Found {schools.length} schools
            </Text>

            {/* List of schools */}
            <List spacing={3}>
                {schools.map(school => (
                    <SchoolItem
                        key={school.NCESSCH}
                        school={school}
                        isSelected={school.NCESSCH === selectedSchool?.NCESSCH}
                        onClick={() => onSelect(school)}
                    />
                ))}
            </List>
        </Box>
    );
};

export default SchoolList;