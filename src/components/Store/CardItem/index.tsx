import { AGENCIES } from '@/constants/agency'
import { StoreSectionEnum } from '@/constants/store'
import { useAgencyContext } from '@/context/agencies.context'
import { CompleteItem } from '@/interfaces'
import { Card, Group, Badge, Button, Text } from '@mantine/core'
import { IconCoins, IconBrandSpotify, IconPhotoCirclePlus } from '@tabler/icons-react'

type CardItemProps = CompleteItem & {
	sectionId: StoreSectionEnum
}

const CardItem = ({ price, gain, bonusStatus, sectionId, condition, name }: CardItemProps) => {
	const { state } = useAgencyContext()
	const hasBonus = bonusStatus! && bonusStatus.includes(state.defaultAgency!)
	const agencyColor = hasBonus && AGENCIES.find((ag) => ag.value === state.defaultAgency)?.color
	const currentGain = hasBonus ? gain + 4 : gain
	const isBooster = sectionId === StoreSectionEnum.BOOSTER
	return (
		<Card w='30%' shadow='sm' style={{ justifyContent: 'space-between' }}>
			<Text fw={500} size='lg' mt='md'>
				{name}
			</Text>

			{condition!! && (
				<Text mt='xs' c='dimmed' size='xs' style={{ flexGrow: 2 }}>
					{condition}
				</Text>
			)}
			<Group p='xs' align='flex-end' justify='flex-end' style={{ flexGrow: 2 }}>
				<Badge
					size='md'
					variant='gradient'
					gradient={{ from: 'violet', to: 'cyan', deg: 273 }}
					rightSection={<IconCoins size='12' />}>
					{price}
				</Badge>
				<Badge
					size='md'
					color={hasBonus ? `${agencyColor}` : 'teal'}
					rightSection={isBooster ? <IconBrandSpotify size='12' /> : <IconPhotoCirclePlus size='12' />}>
					{currentGain}
				</Badge>
			</Group>
			<Button color='teal' variant='light' fullWidth mt='md' radius='md'>
				Ajouter au panier
			</Button>
		</Card>
	)
}

export default CardItem
