import React, {
  useState, useCallback, useEffect, useMemo, useRef,
} from 'react';
import {
  VStack, List, Text, HStack, IconButton, Icon,
} from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { NCESDistrictFeatureAttributes } from '@utils/nces';
import DistrictItem from './DistrictItem';

interface DistrictListProps {
  districts: NCESDistrictFeatureAttributes[];
  selectedDistrict: NCESDistrictFeatureAttributes | null;
  onSelect: (d: NCESDistrictFeatureAttributes) => void;
}

const ITEMS_PER_PAGE = 5;

const DistrictList: React.FC<DistrictListProps> = ({
  districts,
  selectedDistrict,
  onSelect,
}) => {
  const [page, setPage] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // reset page when districts change
  useEffect(() => setPage(1), [districts]);

  // always scroll list top into viewport on page switch
  useEffect(() => {
    wrapperRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(districts.length / ITEMS_PER_PAGE));

  const displayedDistricts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return districts.slice(start, start + ITEMS_PER_PAGE);
  }, [districts, page]);

  const handleSelect = useCallback(
    (d: NCESDistrictFeatureAttributes) => onSelect(d),
    [onSelect],
  );

  if (districts.length === 0) {
    return null;
  }
  return (
    <VStack ref={wrapperRef} align="stretch" spacing={4}>
      <Text fontSize="lg" fontWeight="medium">
        Found {districts.length} school districts
      </Text>

      <List spacing={5} px={3}>
        {displayedDistricts.map((district) => (
          <DistrictItem
            key={district.LEAID}
            district={district}
            isSelected={selectedDistrict?.LEAID === district.LEAID}
            onClick={() => handleSelect(district)}
          />
        ))}
      </List>

      {totalPages > 1 && (
        <HStack pt={2} justify="space-between">
          <IconButton
            aria-label="Previous page"
            icon={<Icon as={FiChevronLeft} />}
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            isDisabled={page === 1}
            variant="ghost"
            _focus={{ boxShadow: 'none' }}
            _focusVisible={{ boxShadow: 'outline' }}
          />
          <Text fontSize="sm">
            {page} / {totalPages}
          </Text>
          <IconButton
            aria-label="Next page"
            icon={<Icon as={FiChevronRight} />}
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            isDisabled={page === totalPages}
            variant="ghost"
            _focus={{ boxShadow: 'none' }}
            _focusVisible={{ boxShadow: 'none' }}
          />
        </HStack>
      )}
    </VStack>
  );
};

export default DistrictList;
 