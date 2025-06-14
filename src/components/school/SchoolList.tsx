import React, { useMemo, useState, useEffect } from 'react';
import {
  VStack, Text, HStack, IconButton, Icon, List,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { NCESSchoolFeatureAttributes as Sch } from '@utils/nces';
import SchoolItem from './SchoolItem';

const ITEMS = 5;

interface Props {
  schools: Sch[];
}

const sid = (s: Sch) => s.NCESSCH ?? `${s.NAME}-${s.LAT}-${s.LON}`;

const SchoolList: React.FC<Props> = ({ schools }) => {
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [schools]);

  if (!schools.length) return null;

  const total = Math.ceil(schools.length / ITEMS);
  const pageSchools = useMemo(
    () => schools.slice((page - 1) * ITEMS, page * ITEMS),
    [page, schools],
  );

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="lg" fontWeight="medium">
        Found {schools.length} schools
      </Text>

      <List spacing={5} px={3}>
        {pageSchools.map((s) => (
          <SchoolItem key={sid(s)} school={s} />
        ))}
      </List>

      {total > 1 && (
        <HStack pt={2} justify="space-between">
          <IconButton
            aria-label="Previous page"
            icon={<Icon as={FiChevronLeft} />}
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            isDisabled={page === 1}
            variant="ghost"
            _focus={{ boxShadow: 'none' }}
            _focusVisible={{ boxShadow: 'none' }}
          />
          <Text fontSize="sm">
            {page} / {total}
          </Text>
          <IconButton
            aria-label="Next page"
            icon={<Icon as={FiChevronRight} />}
            size="sm"
            onClick={() => setPage((p) => Math.min(total, p + 1))}
            isDisabled={page === total}
            variant="ghost"
            _focus={{ boxShadow: 'none' }}
            _focusVisible={{ boxShadow: 'none' }}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default SchoolList;
