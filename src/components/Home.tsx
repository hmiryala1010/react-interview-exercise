import React, { useState } from 'react';
import {
  Box, Center, Grid, GridItem, Heading, VStack, Spinner,
  Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';
import { SearchInput } from '@components/search';
import { DistrictList } from '@components/district';
import SchoolList from '@components/school/SchoolList';
import {
  searchSchoolDistricts, searchSchools,
  NCESDistrictFeatureAttributes as Dist,
  NCESSchoolFeatureAttributes as Sch,
} from '@utils/nces';

type AlertData =
  | { status: 'info' | 'warning' | 'error'; title: string; desc: string }
  | null;

/* ───────────── reusable pieces ───────────── */

const AlertBar: React.FC<{ data: AlertData }> = ({ data }) =>
  data ? (
    <Alert
      status={data.status}
      variant="subtle"
      bg={data.status === 'info' ? 'brand.50' : 'brand.100'}
      borderLeft="6px solid"
      borderColor="brand.500"
      borderRadius="md"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{data.title}</AlertTitle>
      <AlertDescription fontSize="sm">{data.desc}</AlertDescription>
    </Alert>
  ) : null;

// letters, spaces, apostrophes, hyphens only
const isValidDistrictName = (q: string) => /^[A-Za-z\s'-]+$/.test(q.trim());

/* ───────────── main page ───────────── */

export default function Home() {
  const [dq, setDQ] = useState('');
  const [sq, setSQ] = useState('');
  const [dists, setDists] = useState<Dist[]>([]);
  const [schools, setSchools] = useState<Sch[]>([]);
  const [filtered, setFiltered] = useState<Sch[]>([]);
  const [selDist, setSelDist] = useState<Dist | null>(null);
  const [distAlert, setDistAlert] = useState<AlertData>(null);
  const [schoolAlert, setSchoolAlert] = useState<AlertData>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    searchSchoolDistricts('a').catch(() => { });
  }, []);

  /* district search */
  const fetchDistricts = async () => {
    const query = dq.trim();
    if (!query) return;

    // quick validation
    if (!isValidDistrictName(query)) {
      setDistAlert({
        status: 'error',
        title: 'Enter a valid district name',
        desc: 'Numbers or special characters are not allowed.',
      });
      setDists([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchSchoolDistricts(query);
      res.length
        ? (setDists(res), setDistAlert(null))
        : setDistAlert({ status: 'warning', title: 'No districts found', desc: `Nothing matched “${dq}”.` });
    } catch {
      setDistAlert({ status: 'error', title: 'Search failed', desc: 'Could not fetch districts. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  /* load all schools for district */
  const loadSchoolsForDistrict = async (d: Dist) => {
    setLoading(true);
    try {
      const res = await searchSchools('', d.LEAID); // empty query → all schools
      setSchools(res);
      setFiltered(res);
      // alert if district has zero schools
      res.length
        ? setSchoolAlert(null)
        : setSchoolAlert({
          status: 'warning',
          title: 'No schools found',
          desc: 'There are no schools in this district.',
        });
    } catch {
      setSchoolAlert({ status: 'error', title: 'Load failed', desc: 'Could not fetch schools for this district.' });
    } finally {
      setLoading(false);
    }
  };

  /* filter within district */
  const filterSchools = () => {
    if (!sq.trim()) {
      setFiltered(schools);
      setSchoolAlert(null);
      return;
    }
    const f = schools.filter((s) => s.NAME?.toLowerCase().includes(sq.toLowerCase()));
    setFiltered(f);
    setSchoolAlert(
      f.length ? null : { status: 'warning', title: 'No schools found', desc: 'No match in this district.' },
    );
  };

  /* layout */
  return (
    <Box h="100vh" bg="gray.50" overflow="hidden" display="flex" flexDirection="column">
      {/* header */}
      <Center pt="100px" pb={6} flexShrink={0}>
        <VStack spacing={4} maxW="600px" w="full">
          <Heading size="2xl" fontWeight="extrabold" textAlign="center">
            School&nbsp;Data&nbsp;Finder
          </Heading>

          <Box w="full">
            <SearchInput
              placeholder="Search for school district…"
              value={dq}
              onChange={(v) => {
                setDQ(v);
                setDistAlert(null); // reset alert
                if (v.trim() === '') {
                  // cleared → wipe everything
                  setDists([]);
                  setSelDist(null);
                  setSchools([]);
                  setFiltered([]);
                  setSchoolAlert(null);
                }
              }}
              onSearch={fetchDistricts}
              isLoading={loading}
              buttonText="Search Districts"
            />
          </Box>

          <Box w="full">
            <AlertBar data={distAlert} />
          </Box>
        </VStack>
      </Center>

      {/* main grid */}
      <Grid
        templateColumns={{ base: '1fr', md: 'minmax(0,2fr) minmax(0,3fr)' }}
        gap={4}
        p={6}
        flex="1"
        overflow="hidden"
        minH={0}
      >
        {/* districts */}
        <GridItem overflow="hidden">
          <VStack bg="white" p={4} spacing={4} h="full" borderRadius="md" overflow="hidden">
            <Box flex="1" overflowY="auto" w="full" pr={3}>
              <DistrictList
                districts={dists}
                selectedDistrict={selDist}
                onSelect={(d) => {
                  setSelDist(d);
                  setSQ('');
                  setSchools([]);
                  setFiltered([]);
                  loadSchoolsForDistrict(d);
                }}
              />
            </Box>
          </VStack>
        </GridItem>

        {/* schools */}
        <GridItem overflow="hidden">
          <Box
            bg="white" p={4} h="full" overflowY="auto"
            borderRadius="md" boxShadow="sm" display="flex" flexDirection="column"
          >
            <Box w="full" mb={1}>
              <SearchInput
                placeholder="Search for schools…"
                value={sq}
                onChange={(v) => {
                  setSQ(v);
                  if (v.trim() === '') {
                    // cleared → show all schools again
                    setFiltered(schools);
                    setSchoolAlert(null);
                  }
                }}
                onSearch={filterSchools}
                isLoading={loading}
                buttonText="Search Schools"
              />
            </Box>

            <Box w="full" mb={4}>
              <AlertBar data={schoolAlert} />
            </Box>

            {filtered.length > 0 && <SchoolList schools={filtered} />}
          </Box>
        </GridItem>
      </Grid>

      {/* spinner */}
      {loading && (
        <Center position="fixed" top="50%" left="50%" transform="translate(-50%,-50%)" zIndex={1000}>
          <Spinner size="xl" color="brand.500" />
        </Center>
      )}
    </Box>
  );
}
