import React from 'react';
import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiX } from 'react-icons/fi';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading?: boolean;
  buttonText?: string;
}

const SearchInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  onSearch,
}) => {
  const border = 'green.300';
  const focus = useColorModeValue('brand.700', 'brand.300');
  const iconClr = 'gray.600';

  return (
    <InputGroup size="md" w="full">
      {/* left search icon */}
      <InputLeftElement pointerEvents="none" h="full">
        <Icon as={FiSearch} color={iconClr} />
      </InputLeftElement>

      <Input
        pl="2.5rem"
        pr="2.5rem"
        value={value}
        placeholder={placeholder}
        border="3px solid"
        borderColor={border}
        borderRadius="full"
        color={iconClr}
        _placeholder={{ color: 'gray.500' }}
        _hover={{ borderColor: focus }}
        _focusVisible={{ borderColor: focus, boxShadow: `0 0 0 1px ${focus}` }}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
          }
        }}
      />

      {/* right clear (X) icon with green circle */}
      <InputRightElement h="full">
        {value && (
          <IconButton
            aria-label="Clear"
            icon={<FiX />}
            size="xs"
            onClick={() => onChange('')}
            color={iconClr}
            variant="ghost"
            borderRadius="full"
            border="2px solid"
            borderColor={iconClr}
            p="1.5"
            _hover={{
              bg: 'brand.100',
              borderColor: focus,
              color: focus,
            }}
            _active={{ bg: 'brand.50' }}
          />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
export type { Props as SearchInputProps };
