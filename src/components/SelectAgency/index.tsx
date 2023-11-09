'use client';

import { AGENCIES, AgenciesEnum } from '@/constants';
import { AgencyContext } from '@/context/agencies.context';
import { ActionIcon, SimpleGrid, Stack, Title, Tooltip } from '@mantine/core';
import { useContext } from 'react';

export default function SelectAgency() {
  const { state, dispatch } = useContext(AgencyContext);
  console.log('currentState', state);

  return (
    <Stack align="center">
      <Title order={1} size="h3">
        Choisissez votre agence!
      </Title>
      <SimpleGrid cols={3} spacing="lg">
        {AGENCIES.map((agency) => (
          <Tooltip label={agency.label}>
            <ActionIcon
              variant="filled"
              size="xl"
              radius="xl"
              aria-label={agency.label}
              color={agency.color}
              onClick={() => dispatch(agency.value)}
            >
              <agency.icon
                style={{ width: '70%', height: '70%' }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
