import React from 'react';
import {
    ListItem,
    VStack,
    Text,
    Badge,
} from "@chakra-ui/react";
import { NCESSchoolFeatureAttributes } from "@utils/nces";

// Simple props interface
interface SchoolItemProps {
    school: NCESSchoolFeatureAttributes;
    isSelected: boolean;
    onClick: () => void;
}

const SchoolItem = ({ school, isSelected, onClick }: SchoolItemProps) => {
    return (
        <ListItem
            p={4}
            border="1px"
            borderColor={isSelected ? "green.500" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            onClick={onClick}
            _hover={{ bg: "gray.50" }}
        >
            {/* School Name */}
            <Text 
                fontWeight="bold" 
                fontSize="lg"
                mb={2}
            >
                {school.NAME}
            </Text>

            {/* Address */}
            <Text 
                color="gray.600"
                mb={2}
            >
                {school.STREET}, {school.CITY}
            </Text>

            {/* School ID */}
            <Badge colorScheme="green">
                ID: {school.NCESSCH}
            </Badge>
        </ListItem>
    );
};

export default SchoolItem;