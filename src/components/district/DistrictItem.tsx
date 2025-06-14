import React from 'react';
import {
    ListItem,
    VStack,
    Text,
    Badge,
} from "@chakra-ui/react";
import { NCESDistrictFeatureAttributes } from "@utils/nces";

interface DistrictItemProps {
    district: NCESDistrictFeatureAttributes;
    isSelected: boolean;
    onClick: () => void;
}

const DistrictItem = ({ district, isSelected, onClick }: DistrictItemProps) => {
    return (
        <ListItem
            p={4}
            border="1px"
            borderColor={isSelected ? "blue.500" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            onClick={onClick}
            _hover={{ bg: "gray.50" }}
            transition="all 0.2s"
        >
            <VStack align="stretch" spacing={2}>
                <Text fontWeight="bold" fontSize="lg">
                    {district.NAME}
                </Text>
                <Text color="gray.600">
                    {district.LCITY}, {district.LSTATE}
                </Text>
                <Badge colorScheme="blue" alignSelf="flex-start">
                    District ID: {district.LEAID}
                </Badge>
            </VStack>
        </ListItem>
    );
};

export default DistrictItem;