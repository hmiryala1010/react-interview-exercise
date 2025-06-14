 import React, { useState } from "react";
import {
    Center,
    Heading,
    VStack,
    ScaleFade,
    Spinner,
    Divider,
} from "@chakra-ui/react";
import { Card } from '@components/design/Card';
import { SearchInput } from '@components/search';
import { DistrictList } from '@components/district';
import { SchoolList } from '@components/school';
import {
    searchSchoolDistricts,
    searchSchools,
    NCESDistrictFeatureAttributes,
    NCESSchoolFeatureAttributes
} from "@utils/nces";

const Home: React.FC = () => {
    // State management
    const [searching, setSearching] = useState(false);
    const [districtQuery, setDistrictQuery] = useState("");
    const [schoolQuery, setSchoolQuery] = useState("");
    const [districts, setDistricts] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schools, setSchools] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<NCESDistrictFeatureAttributes | null>(null);
    const [selectedSchool, setSelectedSchool] = useState<NCESSchoolFeatureAttributes | null>(null);

    // Search handlers
    const handleDistrictSearch = async () => {
        if (!districtQuery.trim()) return;
        setSearching(true);
        try {
            const results = await searchSchoolDistricts(districtQuery);
            setDistricts(results);
            setSchools([]);
            setSelectedSchool(null);
        } catch (error) {
            console.error("Failed to search districts:", error);
        } finally {
            setSearching(false);
        }
    };

    const handleSchoolSearch = async () => {
        if (!selectedDistrict || !schoolQuery.trim()) return;
        setSearching(true);
        try {
            const results = await searchSchools(schoolQuery, selectedDistrict.LEAID);
            setSchools(results);
        } catch (error) {
            console.error("Failed to search schools:", error);
        } finally {
            setSearching(false);
        }
    };

    return (
        <Center padding="100px" height="90vh">
            <ScaleFade initialScale={0.9} in={true}>
                <Card variant="rounded" borderColor="blue">
                    <VStack spacing={4} width="100%" align="stretch">
                        <Heading>School Data Finder</Heading>

                        {/* District Search */}
                        <SearchInput
                            placeholder="Search for school district..."
                            value={districtQuery}
                            onChange={setDistrictQuery}
                            onSearch={handleDistrictSearch}
                            isLoading={searching}
                            buttonText="Search Districts"
                        />

                        {/* District Results */}
                        {districts.length > 0 && (
                            <DistrictList
                                districts={districts}
                                selectedDistrict={selectedDistrict}
                                onSelect={setSelectedDistrict}
                            />
                        )}

                        {/* School Search */}
                        {selectedDistrict && (
                            <>
                                <Divider />
                                <SearchInput
                                    placeholder="Search for schools in selected district..."
                                    value={schoolQuery}
                                    onChange={setSchoolQuery}
                                    onSearch={handleSchoolSearch}
                                    isLoading={searching}
                                    buttonText="Search Schools"
                                />
                            </>
                        )}

                        {/* School Results */}
                        {schools.length > 0 && (
                            <SchoolList
                                schools={schools}
                                selectedSchool={selectedSchool}
                                onSelect={setSelectedSchool}
                            />
                        )}

                        {/* Loading State */}
                        {searching && <Spinner />}
                    </VStack>
                </Card>
            </ScaleFade>
        </Center>
    );
};

export default Home;