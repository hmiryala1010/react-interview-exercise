// // import React from 'react';
// // import {
// //     InputGroup,
// //     Input,
// //     InputRightAddon,
// //     Button,
// // } from "@chakra-ui/react";

// // // Keep it simple - just what we need
// // interface SearchInputProps {
// //     placeholder: string;
// //     value: string;
// //     onChange: (value: string) => void;
// //     onSearch: () => void;
// //     isLoading?: boolean;
// //     buttonText: string;  // Make it required - clearer intent
// // }
    
// // const SearchInput: React.FC<SearchInputProps> = ({ 
// //     placeholder, 
// //     value, 
// //     onChange, 
// //     onSearch,
// //     isLoading,
// //     buttonText
// // }) => {
// //     // Teachers might press Enter out of habit
// //     const handleKeyPress = (e: React.KeyboardEvent) => {
// //         if (e.key === 'Enter') {
// //             onSearch();
// //         }
// //     };

// //     return (
// //         <InputGroup size="lg"> {/* Larger inputs are easier to use */}
// //             <Input
// //                 placeholder={placeholder}
// //                 value={value}
// //                 onChange={e => onChange(e.target.value)}
// //                 onKeyPress={handleKeyPress}
// //                 bg="white"
// //                 _hover={{ borderColor: "blue.300" }}
// //                 _focus={{ 
// //                     borderColor: "blue.500",
// //                     boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
// //                 }}
// //             />
// //             <InputRightAddon p={0}>
// //                 <Button
// //                     colorScheme="blue"
// //                     onClick={onSearch}
// //                     isLoading={isLoading}
// //                     h="100%"
// //                     px={6}
// //                 >
// //                     {buttonText}
// //                 </Button>
// //             </InputRightAddon>
// //         </InputGroup>
// //     );
// // };

// // export default SearchInput;

// // src/components/search/SearchInput.tsx
// // src/components/search/SearchInput.tsx
// // Rounded search bar with left search icon and clear-text X icon.

// import React from 'react';
// import {
//   InputGroup,
//   Input,
//   InputLeftElement,
//   InputRightElement,
//   Icon,
//   IconButton,
//   useColorModeValue,
//   HStack,
// } from '@chakra-ui/react';
// import { FiSearch, FiX } from 'react-icons/fi';

// interface Props {
//   placeholder: string;
//   value: string;
//   onChange: (value: string) => void;
//   onSearch: () => void;
//   isLoading?: boolean;
//   buttonText?: string;
// }

// const SearchInput: React.FC<Props> = ({
//   placeholder,
//   value,
//   onChange,
//   onSearch,
// }) => {
//   const borderColorValue = useColorModeValue('green.300', 'green.300');
//   const iconClr = 'blackAlpha.600';

//   const focusStyles = {
//     borderColor: borderColorValue,
//     boxShadow: `0 0 0 1px ${borderColorValue}`,
//     outline: 'none',
//   };

//   return (
//     <HStack size="lg" w="full">
//       <InputLeftElement pointerEvents="none" h="full">
//         <Icon as={FiSearch} color={iconClr} />
//       </InputLeftElement>

//       <Input
//         pl="2.5rem"
//         pr="2.5rem"
//         value={value}
//         placeholder={placeholder}
//         border="3px solid"
//         borderColor={borderColorValue}
//         borderRadius="full"
//         color={iconClr}
//         _placeholder={{ color: 'blackAlpha.600' }}
//         _hover={{
//           borderColor: borderColorValue,
//         }}
//         _focus={focusStyles}
//         _focusVisible={focusStyles}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault();
//             onSearch();
//           }
//         }}
//       />

//       <InputRightElement h="full">
//         {value && (
//           // --- Start of Final IconButton Fix ---
//           <IconButton
//             aria-label="Clear"
//             // 1. THIS IS THE KEY: It removes ALL default theme styling.
//             variant="unstyled" 
            
//             // 2. We re-apply the styles we want on our "blank slate".
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             isRound={true}
//             size="xs"
//             bg="blackAlpha.400"
//             color="white"
//             icon={<FiX size="16px" />}
//             onClick={() => onChange('')}

//             // 3. We explicitly disable ALL interactive states for absolute certainty.
//             _hover={{}}
//             _active={{}}
//             _focus={{}}
//             _focusVisible={{}}
//           />
//           // --- End of Final IconButton Fix ---
//         )}
//       </InputRightElement>
//     </HStack>
//   );
// };

// export default SearchInput;
// export type { Props as SearchInputProps };
 

// src/components/search/SearchInput.tsx
// src/components/search/SearchInput.tsx
// src/components/search/SearchInput.tsx
// Rounded search bar with left search icon and clear-text X icon.

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
  buttonText?: string; // ignored, kept for compatibility
}

const SearchInput: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  onSearch,
}) => {
  const border  = useColorModeValue('brand.500', 'brand.500');
  const focus   = useColorModeValue('brand.700', 'brand.300');
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
        border="2px solid"
        borderColor={border}
        borderRadius="lg"
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

      {/* right clear (X) icon */}
      <InputRightElement h="full">
        {value && (
          <IconButton
            aria-label="Clear"
            variant="ghost"
            size="sm"
            icon={<FiX />}
            color={iconClr}
            onClick={() => onChange('')}
            _hover={{ bg: 'transparent', color: focus }}
            _active={{ bg: 'transparent' }}
          />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
export type { Props as SearchInputProps }; 