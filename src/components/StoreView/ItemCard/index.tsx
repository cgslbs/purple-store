'use client'
import { IItem } from '@/interfaces'
import { Accordion, Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { IconArrowBadgeUpFilled, IconCoin, IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'
import classes from './ItemCard.module.css'

export default function ItemCard(item: IItem) {
	const [accordionValue, setAccordionValue] = useState<string | null>(null)

	return (
		<Card shadow='sm' padding='lg' withBorder component={Stack} h={'100%'} justify='space-between'>
			<Stack>
				<Text size={'1.25rem'} className={classes.itemName}>
					{item.name}
				</Text>
				{item.condition !== '' && (
					<Accordion value={accordionValue} onChange={setAccordionValue}>
						<Accordion.Item key={item.id} value={item.id.toString()}>
							<Accordion.Control icon={<IconInfoCircle size={'1rem'} />}>Condition</Accordion.Control>
							<Accordion.Panel>{item.condition}</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				)}
			</Stack>
			<Stack>
				<Group justify='flex-end'>
					<Badge
						variant='gradient'
						gradient={{ from: 'blue', to: 'violet', deg: 90 }}
						rightSection={<IconCoin size={'0.75rem'} />}>
						{item.price}
					</Badge>
					<Badge color='pink' rightSection={<IconArrowBadgeUpFilled size={'0.75rem'} />}>
						{item.gain}
					</Badge>
				</Group>
				<Button>Ajouter au panier</Button>
			</Stack>
		</Card>
	)
}
