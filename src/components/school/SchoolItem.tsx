import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Collapse,
  SimpleGrid,
  Flex,
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
      mb={2}
    >
      <VStack align="stretch" spacing={2}>
        <Flex align="center" justify="space-between" w="full">
          <Box lineHeight="short">

            <Text fontWeight="bold" fontSize="lg">
              {school.NAME}
            </Text>
            <Text fontSize="xs" color="gray.600">{addr(school)}</Text>
          </Box>

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
          >
            {open ? 'Hide Details' : 'More Details'}
          </Button>
        </Flex>
        {open && (<Collapse in={open} animateOpacity>
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
        )}
      </VStack>
    </Box>
  );
};

export default SchoolItem;
