// import React from 'react';
// import {
//     ListItem,
//     VStack,
//     Text,
//     Badge,
// } from "@chakra-ui/react";
// import { NCESDistrictFeatureAttributes } from "@utils/nces";

// interface DistrictItemProps {
//     district: NCESDistrictFeatureAttributes;
//     isSelected: boolean;
//     onClick: () => void;
// }

// const DistrictItem = ({ district, isSelected, onClick }: DistrictItemProps) => {
//     return (
//         <ListItem
//             p={4}
//             border="1px"
//             borderColor={isSelected ? "blue.500" : "gray.200"}
//             borderRadius="md"
//             cursor="pointer"
//             onClick={onClick}
//             _hover={{ bg: "gray.50" }}
//             transition="all 0.2s"
//         >
//             <VStack align="stretch" spacing={2}>
//                 <Text fontWeight="bold" fontSize="lg">
//                     {district.NAME}
//                 </Text>
//                 <Text color="gray.600">
//                     {district.LCITY}, {district.LSTATE}
//                 </Text>
//                 <Badge colorScheme="blue" alignSelf="flex-start">
//                     District ID: {district.LEAID}
//                 </Badge>
//             </VStack>
//         </ListItem>
//     );
// };

// export default DistrictItem;

// import React, { useState } from 'react';
// import {
//   Box,
//   VStack,
//   Text,
//   Button,
//   Collapse,
//   SimpleGrid,
// } from '@chakra-ui/react';
// import { NCESDistrictFeatureAttributes } from '@utils/nces';

// interface Props {
//   district: NCESDistrictFeatureAttributes;
//   isSelected: boolean;
//   onClick: () => void;
// }

// const DistrictItem: React.FC<Props> = ({ district, isSelected, onClick }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Box
//       as="li"
//       p={3}
//       border="1px"
//       borderColor={isSelected ? 'brand.500' : 'gray.200'}
//       borderRadius="md"
//       cursor="pointer"
//       _hover={{ bg: 'brand.50' }}
//       onClick={onClick}
//     >
//       <VStack align="stretch" spacing={2}>
//         <Text fontWeight="bold" fontSize="lg">
//           {district.NAME}
//         </Text>
//         <Text color="gray.600">
//           {district.LCITY}, {district.LSTATE}
//         </Text>

//         <Button
//           size="sm"
//           variant="outline"
//           borderColor="blackAlpha.400"
//           borderRadius="full"
//           color="black"
//           fontWeight="normal"
//           bg={open ? 'green.300' : undefined} // Conditionally set background
//           _hover={{
//             bg: !open ? 'green.50' : 'green.300',
//             borderColor: 'green.300',
//           }}
//           _focus={{
//             bg: open ? 'green.300' : undefined, // Go back to transparent when closed
//             borderColor: open ? 'green.300' : 'blackAlpha.400', // Go back to initial border
//             boxShadow: 'none',
//           }}
//           _active={{
//             bg: open ? 'green.300' : undefined, // Go back to transparent when closed
//             borderColor: open ? 'green.300' : 'blackAlpha.400', // Go back to initial border
//             boxShadow: 'none',
//           }}
//           onClick={(e) => {
//             e.stopPropagation();
//             setOpen((o) => !o);
//           }}
//           alignSelf="flex-start"
//         >
//           {open ? 'Hide Details' : 'More Details'}
//         </Button>

//         <Collapse in={open} animateOpacity>
//           <Box pt={2}>
//             <SimpleGrid columns={2} spacingY={1} fontSize="sm">
//               <Text fontWeight="medium">District ID:</Text>
//               <Text>{district.LEAID}</Text>

//               <Text fontWeight="medium">Street:</Text>
//               <Text>{district.LSTREE || '—'}</Text>

//               <Text fontWeight="medium">ZIP:</Text>
//               <Text>{district.LZIP || '—'}</Text>

//               <Text fontWeight="medium">County:</Text>
//               <Text>{district.NMCNTY15 || '—'}</Text>

//               <Text fontWeight="medium">CBSA Code:</Text>
//               <Text>{district.CBSA15 || '—'}</Text>

//               <Text fontWeight="medium">Latitude:</Text>
//               <Text>{district.LAT1516?.toFixed(4) ?? '—'}</Text>

//               <Text fontWeight="medium">Longitude:</Text>
//               <Text>{district.LON1516?.toFixed(4) ?? '—'}</Text>
//             </SimpleGrid>
//           </Box>
//         </Collapse>
//       </VStack>
//     </Box>
//   );
// };

// export default DistrictIte


/**
 * CharacterStrong – DistrictItem
 * --------------------------------
 * • Fades/slides-in on mount (Framer Motion).
 * • Scales + light-tint on hover; green-only palette.
 * • Accessible focus ring; all styles via Chakra tokens.
 */
/**
 * CharacterStrong – DistrictItem
 * --------------------------------
 * Added subtle green shadow on load, hover, and when selected.
 */
/**
 * CharacterStrong – DistrictItem
 * Button style copied from SchoolItem for visual consistency.
 */

import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Collapse,
  SimpleGrid,
  useToken,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NCESDistrictFeatureAttributes } from '@utils/nces';

interface Props {
  district: NCESDistrictFeatureAttributes;
  isSelected: boolean;
  onClick: () => void;
}

const MotionBox = motion(Box);

const DistrictItem: React.FC<Props> = ({ district, isSelected, onClick }) => {
  const [open, setOpen] = useState(false);

  // greens for list-item background / hover
  const [brand50, brand100] = useToken('colors', ['brand.50', 'brand.100']);
  const greenShadow = '0 2px 6px rgba(21,109,24,0.25)';

  return (
    <MotionBox
      as="li"
      p={2}
      border="1px"
      borderColor={isSelected ? 'brand.500' : 'gray.200'}
      borderRadius="md"
      cursor="pointer"
      bg={isSelected ? brand50 : undefined}
      boxShadow={isSelected ? greenShadow : undefined}
      whileHover={{ scale: 1.02, backgroundColor: brand100, boxShadow: greenShadow }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
    >
      <VStack align="stretch" spacing={2}>
        <Text fontWeight="bold" fontSize="lg" color="brand.700">
          {district.NAME}
        </Text>

        <Text color="brand.900">
          {district.LCITY}, {district.LSTATE}
        </Text>

        <Button
          size="sm"
          variant="outline"
          borderRadius="full"
          fontWeight="normal"
          borderColor={open ? 'green.300' : 'blackAlpha.400'}
          color="black"
          bg={open ? 'green.300' : undefined}
          _hover={{
            bg: open ? 'green.300' : 'green.50',
            borderColor: 'green.300',
          }}
          _focus={{
            bg: open ? 'green.300' : undefined,
            borderColor: open ? 'green.300' : 'blackAlpha.400',
            boxShadow: 'none',
          }}
          _active={{
            bg: open ? 'green.300' : undefined,
            borderColor: open ? 'green.300' : 'blackAlpha.400',
            boxShadow: 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          alignSelf="flex-start"
        >
          {open ? 'Hide Details' : 'More Details'}
        </Button>

        <Collapse in={open} animateOpacity>
          <Box pt={2}>
            <SimpleGrid columns={2} spacingY={1} fontSize="sm">
              <Text fontWeight="medium">District ID:</Text>
              <Text>{district.LEAID}</Text>

              <Text fontWeight="medium">Street:</Text>
              <Text>{district.LSTREE || '—'}</Text>

              <Text fontWeight="medium">ZIP:</Text>
              <Text>{district.LZIP || '—'}</Text>

              <Text fontWeight="medium">County:</Text>
              <Text>{district.NMCNTY15 || '—'}</Text>

              <Text fontWeight="medium">CBSA Code:</Text>
              <Text>{district.CBSA15 || '—'}</Text>

              <Text fontWeight="medium">Latitude:</Text>
              <Text>{district.LAT1516?.toFixed(4) ?? '—'}</Text>

              <Text fontWeight="medium">Longitude:</Text>
              <Text>{district.LON1516?.toFixed(4) ?? '—'}</Text>
            </SimpleGrid>
          </Box>
        </Collapse>
      </VStack>
    </MotionBox>
  );
};

export default DistrictItem;
