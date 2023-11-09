import Image from 'next/image';
import styles from './page.module.css';
import { Container } from '@mantine/core';
import SelectAgency from '@/components/SelectAgency';

export default function Home() {
  return (
    <Container>
      <SelectAgency />
    </Container>
  );
}
