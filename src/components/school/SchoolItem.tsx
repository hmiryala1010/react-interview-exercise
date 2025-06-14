// // src/components/school/SchoolItem.tsx
// import React from 'react';
// import { ListItem, VStack, Text, Button } from '@chakra-ui/react';
// import { NCESSchoolFeatureAttributes } from '@utils/nces';

// interface Props {
//   school: NCESSchoolFeatureAttributes;
//   onViewMap: () => void;
// }

// const SchoolItem: React.FC<Props> = ({ school, onViewMap }) => (
//   <ListItem p={4} border="1px" borderColor="gray.200" borderRadius="md">
//     <VStack align="stretch" spacing={2}>
//       <Text fontWeight="bold">{school.NAME}</Text>
//       <Text color="gray.600">
//         {school.CITY}, {school.STATE}
//       </Text>

//       <Button
//         size="sm"
//         variant="outline"
//         borderColor="gray.400"
//         borderRadius="lg"
//         color="black"
//         fontWeight="normal"
//         _hover={{ bg: 'brand.100' }}
//         onClick={onViewMap}
//         alignSelf="flex-start"
//       >
//         View Map
//       </Button>
//     </VStack>
//   </ListItem>
// );

// export default SchoolItem;
// import React, { useState } from 'react';
// import { Box, VStack, Text, Button } from '@chakra-ui/react';
// import MapView from './MapView';
// import { NCESSchoolFeatureAttributes as Sch } from '@utils/nces';

// const addr = (s: Sch) =>
//   [s.STREET, s.CITY && `${s.CITY},`, s.STATE, s.ZIP]
//     .filter(Boolean)
//     .join(' ');

// interface Props {
//   school: Sch;
// }

// const SchoolItem: React.FC<Props> = ({ school }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <Box
//       p={3}
//       border="1px solid"
//       borderColor="gray.200"
//       borderRadius="md"
//       _hover={{ bg: 'gray.50' }}
//       mb={3}
//          minH="110px"
//     >
//       <VStack align="stretch" spacing={1}>
//         <Text fontWeight="medium">{school.NAME}</Text>
//         <Text fontSize="md" color="gray.600">
//           {addr(school)}
//         </Text>

//         <Button
//           size="sm"
//           variant="outline"
//           borderColor="blackAlpha.400"
//           borderRadius="full"
//           color="black"
//           fontWeight="normal"
//           bg={open ? 'green.300' : undefined}
//           _hover={{
//             bg: open ? 'green.300' : 'green.50',
//             borderColor: 'green.300',
//           }}
//           _focus={{
//             bg: open ? 'green.300' : undefined,
//             borderColor: open ? 'green.300' : 'blackAlpha.400',
//             boxShadow: 'none',
//           }}
//           _active={{
//             bg: open ? 'green.300' : undefined,
//             borderColor: open ? 'green.300' : 'blackAlpha.400',
//             boxShadow: 'none',
//           }}
//           onClick={() => setOpen(o => !o)}
//           aria-label={open ? 'Hide map' : 'View map'}
//           alignSelf="flex-start"
//         >
//           {open ? 'Hide Map' : 'View Map'}
//         </Button>

//         {open && (
//           <Box
//             mt={2}
//             h="300px"
//             border="1px solid"
//             borderColor="gray.200"
//             borderRadius="md"
//             overflow="hidden"
//             w="full"
//           >
//             <MapView schools={[school]} selectedSchool={school} />
//           </Box>
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default SchoolItem;

// src/components/school/SchoolItem.tsx
import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Collapse,
  SimpleGrid,
} from '@chakra-ui/react';
import MapView from './MapView';
import { NCESSchoolFeatureAttributes as Sch } from '@utils/nces';

const addr = (s: Sch) =>
  [s.STREET, s.CITY && `${s.CITY},`, s.STATE, s.ZIP]
    .filter(Boolean)
    .join(' ');

interface Props {
  school: Sch;
}

const SchoolItem: React.FC<Props> = ({ school }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      as="li"
      p={3}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{ bg: 'gray.50' }}
      mb={3}
      minH="110px"
    >
      <VStack align="stretch" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {school.NAME}
        </Text>
        <Text color="gray.600">{addr(school)}</Text>

        <Button
          size="sm"
          variant="outline"
          borderColor="blackAlpha.400"
          borderRadius="full"
          color="black"
          fontWeight="normal"
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
          onClick={() => setOpen((o) => !o)}
          alignSelf="flex-start"
        >
          {open ? 'Hide Details' : 'More Details'}
        </Button>

        <Collapse in={open} animateOpacity>
          <Box pt={2}>
            {/* attribute table */}
            <SimpleGrid columns={2} spacingY={1} fontSize="sm">
              <Text fontWeight="medium">School ID:</Text>
              <Text>{school.NCESSCH || '—'}</Text>

              <Text fontWeight="medium">District ID:</Text>
              <Text>{school.LEAID || '—'}</Text>

              <Text fontWeight="medium">Locale:</Text>
              <Text>{school.LOCALE || '—'}</Text>

              <Text fontWeight="medium">County:</Text>
              <Text>{school.NMCNTY || '—'}</Text>

              <Text fontWeight="medium">Latitude:</Text>
              <Text>{school.LAT?.toFixed(4) ?? '—'}</Text>

              <Text fontWeight="medium">Longitude:</Text>
              <Text>{school.LON?.toFixed(4) ?? '—'}</Text>
            </SimpleGrid>

            {/* map preview */}
            <Box
              mt={3}
              h="300px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
            >
              <MapView schools={[school]} selectedSchool={school} />
            </Box>
          </Box>
        </Collapse>
      </VStack>
    </Box>
  );
};

export default SchoolItem;
