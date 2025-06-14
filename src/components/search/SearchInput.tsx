import React from 'react';
import {
    InputGroup,
    Input,
    InputRightAddon,
    Button,
} from "@chakra-ui/react";

// Keep it simple - just what we need
interface SearchInputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    isLoading?: boolean;
    buttonText: string;  // Make it required - clearer intent
}

const SearchInput: React.FC<SearchInputProps> = ({ 
    placeholder, 
    value, 
    onChange, 
    onSearch,
    isLoading,
    buttonText
}) => {
    // Teachers might press Enter out of habit
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <InputGroup size="lg"> {/* Larger inputs are easier to use */}
            <Input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                bg="white"
                _hover={{ borderColor: "blue.300" }}
                _focus={{ 
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
                }}
            />
            <InputRightAddon p={0}>
                <Button
                    colorScheme="blue"
                    onClick={onSearch}
                    isLoading={isLoading}
                    h="100%"
                    px={6}
                >
                    {buttonText}
                </Button>
            </InputRightAddon>
        </InputGroup>
    );
};

export default SearchInput;