import React from 'react';
import {
    Box,
    List,
    Text,
} from "@chakra-ui/react";
import { NCESDistrictFeatureAttributes } from "@utils/nces";
import DistrictItem from './DistrictItem';

interface DistrictListProps {
    districts: NCESDistrictFeatureAttributes[];
    selectedDistrict: NCESDistrictFeatureAttributes | null;
    onSelect: (district: NCESDistrictFeatureAttributes) => void;
}

const DistrictList = ({ districts, selectedDistrict, onSelect }: DistrictListProps) => {
    if (districts.length === 0) return null;

    return (
        <Box>
            <Text fontSize="lg" mb={4}>
                Found {districts.length} school districts
            </Text>
            <List spacing={3}>
                {districts.map(district => (
                    <DistrictItem
                        key={district.LEAID}
                        district={district}
                        isSelected={selectedDistrict?.LEAID === district.LEAID}
                        onClick={() => onSelect(district)}
                    />
                ))}
            </List>
        </Box>
    );
};

export default DistrictList;