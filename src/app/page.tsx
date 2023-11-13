import { Container } from '@mantine/core';
import SelectAgency from '@/components/SelectAgency';
import { HeaderTabs } from '@/components/Header';

export default function Home() {
  return (
    <Container fluid>
      <HeaderTabs />
      <SelectAgency />
    </Container>
  );
}
