'use client';

import { AGENCIES } from '@/constants/agency';
import { AgencyContext } from '@/context/agencies.context';
import { ActionIcon, Modal, SimpleGrid, Stack, Tooltip } from '@mantine/core';
import { useContext, useMemo } from 'react';

export default function SelectAgency() {
  const { state, dispatch } = useContext(AgencyContext);
  console.log('currentState', state);

  const modalOpened = useMemo(() => {
    return state.defaultAgency === null;
  }, [state.defaultAgency]);

  return (
    <Modal
      opened={modalOpened}
      onClose={() => {}}
      withCloseButton={false}
      title="Choisissez votre agence!"
      centered
    >
      <Stack align="center" py="lg">
        <SimpleGrid cols={3} spacing="lg">
          {AGENCIES.map((agency) => (
            <Tooltip key={agency.label} label={agency.label}>
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
    </Modal>
  );
}
