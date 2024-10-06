/* eslint-disable react/no-unescaped-entities */
'use client'

import { CartActionEnum, CartItemType, useCartContext } from '@/context/cart.context'
import {
	ActionIcon,
	Anchor,
	Button,
	CloseButton,
	Container,
	Group,
	MultiSelect,
	NumberFormatter,
	ScrollArea,
	Stack,
	Table,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import {
	IconArrowBack,
	IconArrowBackUp,
	IconBook,
	IconCalendar,
	IconDeviceFloppy,
	IconDirections,
	IconEdit,
	IconFaceId,
	IconHanger,
	IconLink,
	IconMasksTheater,
	IconMinus,
	IconMusic,
	IconPlaylist,
	IconPlus,
	IconTicket,
	IconTrash,
	IconX,
} from '@tabler/icons-react'
import { ItemGainType } from '@/constants/item'
import { useRouter } from 'next/navigation'
import { FormProvider, useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form'
import {
	FormByProjectProps,
	ItemsMultiselectProps,
	ProjectItemProps,
	ProjectItemType,
	defaultProjectItem,
} from './Cart.types'
import { useEffect, useMemo, useReducer } from 'react'
import { CodeHighlight } from '@mantine/code-highlight'
import { IItem, ProjectTypeEnum } from '@/interfaces'
import dayjs from 'dayjs'

// ROW TABLE ITEM COMPONENTS
const RemoveItem = (item: CartItemType) => {
	const { dispatch } = useCartContext()
	return (
		<ActionIcon
			variant='subtle'
			color='gray'
			onClick={() => dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: item })}>
			<IconX size={'1rem'} />
		</ActionIcon>
	)
}

const QuantityCounter = (item: CartItemType) => {
	const { dispatch } = useCartContext()

	return (
		<Group
			wrap='nowrap'
			justify='space-around'
			grow
			style={(theme) => ({ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: '5rem', overflow: 'hidden' })}>
			<ActionIcon
				radius={0}
				variant='transparent'
				c={'dark'}
				disabled={item.quantity === 1}
				onClick={() => {
					dispatch({ type: CartActionEnum.DECREASE_QTY, payload: item })
				}}>
				<IconMinus size={'1rem'} />
			</ActionIcon>
			<Text ta={'center'} size='sm'>
				{item.quantity}
			</Text>
			<ActionIcon
				radius={0}
				variant='transparent'
				c={'dark'}
				onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: item })}>
				<IconPlus size={'1rem'} />
			</ActionIcon>
		</Group>
	)
}

const ProductRow = (item: CartItemType) => {
	return (
		<Table.Tr>
			<Table.Td>{item.name}</Table.Td>
			<Table.Td>
				<QuantityCounter {...item} />
			</Table.Td>
			<Table.Td>{item.price}</Table.Td>
			<Table.Td>
				{item.gain}
				{item.gainType === ItemGainType.XP ? 'XP' : ' streams'}
				{item.doubleGain !== null && `& ${item.doubleGain} streams`}
			</Table.Td>
			<Table.Td>
				{item.doubleGain !== null
					? `${item.gain * item.quantity}XP ${item.doubleGain * item.quantity} streams`
					: `${item.gain * item.quantity}XP`}
			</Table.Td>
			<Table.Td>{item.quantity * item.price}pts</Table.Td>
			<Table.Td>
				<RemoveItem {...item} />
			</Table.Td>
		</Table.Tr>
	)
}

// SUBTOTAL
const Total = () => {
	const { totalGain, totalStream, totalPrice } = useCartContext()

	return (
		<Group>
			<Text fw={600}>Total:</Text>
			<NumberFormatter suffix='points' thousandSeparator value={totalPrice} />
			{totalGain > 0 && <NumberFormatter suffix='XP' thousandSeparator value={totalGain} />}
			{totalStream > 0 && <NumberFormatter suffix='streams' thousandSeparator value={totalStream} />}
		</Group>
	)
}

// PROJECT COMPONENTS
const ItemsMultiselect = ({ index, isEditMode, currentTypeProject }: ItemsMultiselectProps) => {
	const { cart } = useCartContext()
	const { control, setValue, getValues } = useFormContext()
	const currentSelection = useWatch({ control, name: `projects.${index}.items` }) as CartItemType[]
	const optionByProject = useMemo(() => {
		return cart.filter((item) => item.type === currentTypeProject && item.gainType !== ItemGainType.STREAM)
	}, [currentTypeProject, cart])

	useEffect(() => {
		// UPDATE SELECTION IF ITEM IS REMOVED FROM CART
		const saveItems: IItem[] = []
		const currSelection: IItem[] = getValues(`projects.${index}.items`)
		currSelection.forEach((selectItem) => {
			const currItem = cart.find((item) => item.id === +selectItem.id)
			if (currItem === undefined) return
			saveItems.push(currItem)
		})
		setValue(`projects.${index}.items`, saveItems)
	}, [cart])

	return (
		<MultiSelect
			label='Items'
			w='100%'
			disabled={optionByProject.length === 0 || !isEditMode}
			data={optionByProject.map((item) => ({ value: item.id.toString(), label: item.name }))}
			value={currentSelection.map((item) => item.id.toString())}
			onChange={(arrId) => {
				const currSelection = arrId
				const saveItems: IItem[] = []
				// ADDITION OR DELETION
				currSelection.forEach((selectItem) => {
					const currItem = cart.find((item) => item.id === +selectItem)
					if (currItem === undefined) return
					saveItems.push(currItem)
				})
				setValue(`projects.${index}.items`, saveItems)
			}}
		/>
	)
}

const FormByProject = ({ index, projectType, isEditMode }: FormByProjectProps) => {
	const { register, getValues } = useFormContext()
	switch (projectType) {
		case ProjectTypeEnum.IG_YTB_POST:
			if (!isEditMode) {
				return (
					<Anchor href={getValues(`projects.${index}.url`)} target='_blank' underline='never'>
						post
					</Anchor>
				)
			}
			return (
				<TextInput
					w='100%'
					size='xs'
					label='URL du post'
					leftSection={<IconLink size={'1rem'} />}
					{...register(`projects.${index}.url`)}
				/>
			)
		case ProjectTypeEnum.DRAMA: {
			if (!isEditMode) {
				return (
					<Text>
						{getValues(`projects.${index}.title`)}, {getValues(`projects.${index}.roleName`)}
					</Text>
				)
			}
			return (
				<Stack gap='xs' w='100%'>
					<TextInput
						w='100%'
						size='xs'
						leftSection={<IconTicket size={'1rem'} />}
						label='Titre du drama'
						{...register(`projects.${index}.title`)}
					/>
					<TextInput
						w='100%'
						size='xs'
						leftSection={<IconMasksTheater size={'1rem'} />}
						label='Nom du personnage'
						{...register(`projects.${index}.roleName`)}
					/>
				</Stack>
			)
		}
		case ProjectTypeEnum.OST_DRAMA: {
			if (!isEditMode) {
				return (
					<Text>
						'{getValues(`projects.${index}.title`)}', {getValues(`projects.${index}.artist`)} -{' '}
						{getValues(`projects.${index}.subTitle`)}
					</Text>
				)
			}
			return (
				<Stack gap='xs' w='100%'>
					<TextInput
						size='xs'
						leftSection={<IconTicket size={'1rem'} />}
						label='Titre du drama'
						{...register(`projects.${index}.title`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconPlaylist size={'1rem'} />}
						label='Artiste IRL'
						{...register(`projects.${index}.artist`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconMusic size={'1rem'} />}
						label='Titre de la chanson'
						{...register(`projects.${index}.subTitle`)}
					/>
				</Stack>
			)
		}
		case ProjectTypeEnum.PRODUCTION: {
			if (!isEditMode) {
				return (
					<Text>
						'{getValues(`projects.${index}.title`)}', {getValues(`projects.${index}.artist`)} -{' '}
						{getValues(`projects.${index}.releaseDate`)}
					</Text>
				)
			}
			return (
				<Stack gap='xs' w='100%'>
					<TextInput
						size='xs'
						leftSection={<IconMusic size={'1rem'} />}
						label='Titre'
						{...register(`projects.${index}.title`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconPlaylist size={'1rem'} />}
						label='Artiste'
						{...register(`projects.${index}.artist`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconCalendar size={'1rem'} />}
						label='Date'
						placeholder='mois année'
						{...register(`projects.${index}.releaseDate`)}
					/>
				</Stack>
			)
		}
		case ProjectTypeEnum.RELEASE: {
			if (!isEditMode) {
				return (
					<Text>
						'{getValues(`projects.${index}.title`)}', {getValues(`projects.${index}.artist`)}
					</Text>
				)
			}
			return (
				<Stack gap='xs' w='100%'>
					<TextInput
						size='xs'
						leftSection={<IconMusic size={'1rem'} />}
						label='Titre'
						{...register(`projects.${index}.title`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconPlaylist size={'1rem'} />}
						label='Artiste'
						{...register(`projects.${index}.artist`)}
					/>
				</Stack>
			)
		}
		case ProjectTypeEnum.CF_PHOTOSHOOT: {
			if (!isEditMode) {
				return (
					<Anchor target='_blank' href={getValues(`projects.${index}.url`)} underline='never'>
						'{getValues(`projects.${index}.celebrityName`)}' x {getValues(`projects.${index}.brandName`)} x{' '}
						{getValues(`projects.${index}.magazineName`)} - {getValues(`projects.${index}.releaseDate`)}
					</Anchor>
				)
			}
			return (
				<Stack gap='xs' w='100%'>
					<TextInput
						size='xs'
						leftSection={<IconFaceId size={'1rem'} />}
						label='Célébrité IRL'
						{...register(`projects.${index}.celebrityName`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconHanger size={'1rem'} />}
						label='Marque'
						{...register(`projects.${index}.brandName`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconBook size={'1rem'} />}
						label='Magazine'
						{...register(`projects.${index}.magazineName`)}
					/>
					<TextInput
						size='xs'
						leftSection={<IconCalendar size={'1rem'} />}
						label='Date IRL'
						placeholder='mois année'
						{...register(`projects.${index}.releaseDate`)}
					/>
					<TextInput
						size='xs'
						label='URL'
						leftSection={<IconLink size={'1rem'} />}
						{...register(`projects.${index}.url`)}
					/>
				</Stack>
			)
		}
		case ProjectTypeEnum.AMBASSADOR_FACE_CONTRACT: {
			if (!isEditMode) {
				return <Text>{getValues(`projects.${index}.brandName`)}</Text>
			}
			return (
				<TextInput
					size='xs'
					w='100%'
					leftSection={<IconHanger size={'1rem'} />}
					label='Marque'
					{...register(`projects.${index}.brandName`)}
				/>
			)
		}
		case ProjectTypeEnum.TITLE:
		default:
			if (!isEditMode) {
				return <Text>{getValues(`projects.${index}.title`)}</Text>
			}
			return (
				<TextInput
					w='100%'
					size='xs'
					leftSection={<IconDirections size={'1rem'} />}
					label='Projet libre'
					{...register(`projects.${index}.title`)}
				/>
			)
	}
}

const ProjectItem = ({ index, onRemove }: ProjectItemProps) => {
	const { cart } = useCartContext()
	const { control, setValue } = useFormContext()
	const [isEditMode, toggleEditMode] = useReducer((s) => !s, true)

	const currProjectType = useWatch({ control, name: `projects.${index}.projectType` }) as ProjectTypeEnum

	const onSettingProjectType = (ProjectType: ProjectTypeEnum) => {
		setValue(`projects.${index}.projectType`, ProjectType)
	}

	if (currProjectType === ProjectTypeEnum.NONE) {
		return (
			<Group align='flex-start' wrap='nowrap' h='100%'>
				<Button.Group orientation='vertical'>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.RELEASE)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.RELEASE)
						}}>
						Chanson
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.PRODUCTION)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.PRODUCTION)
						}}>
						Production
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.DRAMA)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.DRAMA)
						}}>
						Drama
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.CF_PHOTOSHOOT)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.CF_PHOTOSHOOT)
						}}>
						CF / Photoshoot
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.AMBASSADOR_FACE_CONTRACT)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.AMBASSADOR_FACE_CONTRACT)
						}}>
						Contrat Ambassadeur / Face
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.OST_DRAMA)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.OST_DRAMA)
						}}>
						OST
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.IG_YTB_POST)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.IG_YTB_POST)
						}}>
						IG post / Youtube post
					</Button>
					<Button
						disabled={!cart.some((item) => item.type === ProjectTypeEnum.TITLE)}
						onClick={() => {
							onSettingProjectType(ProjectTypeEnum.TITLE)
						}}>
						Lier un événement / projet simple
					</Button>
				</Button.Group>
				<CloseButton onClick={onRemove} />
			</Group>
		)
	}

	return (
		<Stack gap='xs' align='flex-end'>
			<FormByProject isEditMode={isEditMode} index={index} projectType={currProjectType} />
			<ItemsMultiselect index={index} isEditMode={isEditMode} currentTypeProject={currProjectType} />
			<ActionIcon.Group>
				<ActionIcon color='red' variant='light' onClick={onRemove} aria-label='Delete'>
					<IconTrash size={'1rem'} />
				</ActionIcon>
				<ActionIcon onClick={toggleEditMode} color='blue' variant='light' aria-label='Save'>
					{isEditMode ? <IconDeviceFloppy size='1rem' /> : <IconEdit size='1rem' />}
				</ActionIcon>
			</ActionIcon.Group>
		</Stack>
	)
}

// CODE HIGHLIGHT TOTAL

function projectLine(project: ProjectItemType) {
	let projectLine = ''
	switch (project.projectType) {
		case ProjectTypeEnum.IG_YTB_POST:
			projectLine += `[url=${project.url}]post[/url]`
			break
		case ProjectTypeEnum.DRAMA: {
			projectLine += `${project.title}, ${project.roleName}`
			break
		}
		case ProjectTypeEnum.OST_DRAMA: {
			projectLine += `'${project.title}', ${project.artist}, ${project.subTitle}`
			break
		}
		case ProjectTypeEnum.PRODUCTION: {
			projectLine += `'${project.title}', ${project.artist} - ${project.releaseDate}`
			break
		}
		case ProjectTypeEnum.RELEASE: {
			projectLine += `'${project.title}', ${project.artist}`
			break
		}
		case ProjectTypeEnum.CF_PHOTOSHOOT: {
			projectLine += `[url=${project.url}]${project.celebrityName}${
				project.brandName !== undefined && ` x ${project.brandName}`
			}${project.magazineName !== undefined && ` x ${project.magazineName}`} - ${project.releaseDate}[/url] `
			break
		}
		case ProjectTypeEnum.AMBASSADOR_FACE_CONTRACT: {
			projectLine += `'${project.brandName}'`
			break
		}
		case ProjectTypeEnum.TITLE:
		default:
			projectLine += `'${project.title}'`
			break
	}
	return projectLine
}

function itemLine(item: CartItemType, isProject: boolean = false) {
	const gainType = item.gainType === ItemGainType.STREAM ? ' streams' : 'xp'
	const quantity = !isProject && item.quantity > 1 ? ` * ${item.quantity}` : ``
	let gainPrice =
		item.doubleGain !== null
			? `${item.price}pts & ${item.gain}XP + ${item.doubleGain} streams`
			: `${item.price}pts & ${item.gain}${gainType}`

	return `${item.name}, ${gainPrice} ${quantity} \n`
}

const TotalCodeHighlight = () => {
	// 1RT PART: list achat
	const { cart, totalGain, totalPrice, totalStream } = useCartContext()
	const { getValues } = useFormContext()

	const projects: ProjectItemType[] = getValues('projects')
	const allItems = cart
	let listItems = ''
	let itemsHistory = ''

	if (projects.length > 0) {
		projects.forEach((project) => {
			const currProject = projectLine(project)
			project.items.forEach((item) => {
				if (item.gainType === ItemGainType.STREAM) return
				// HISTORY CODE LINE
				itemsHistory += `${item.name} (${currProject}) <xp>${item.gain}XP</xp> \n`
				// ITEM LIST
				listItems += itemLine(item, true)
				// remove item from allitems
				const currItemIndex = allItems.findIndex((v) => v.id === item.id)
				allItems[currItemIndex].quantity -= 1
			})
			listItems += `→ ${currProject} \n`
		})
	}

	if (allItems.length > 0) {
		const boosters = allItems.filter((item) => item.gainType === ItemGainType.STREAM)
		if (boosters.length > 0) {
			const totalBoosterQuantity = boosters.reduce((acc, curr) => {
				return acc + curr.quantity
			}, 0)
			itemsHistory += `boosters * ${totalBoosterQuantity}, <xp>${totalStream / 1000}k streams</xp> \n`
		}
		allItems.forEach((item) => {
			if (item.quantity > 0) {
				listItems += itemLine(item)
				if (item.gainType !== ItemGainType.STREAM) {
					itemsHistory += `${item.name} ${item.quantity > 1 ? `* ${item.quantity}` : ''} <xp>${
						item.quantity > 1 ? `${item.gain * item.quantity}` : `${item.gain}`
					}XP</xp> \n`
				}
			}
		})
	}
	// 2ND PART: histo code
	const currentDate = `${dayjs().format('DDMM')}`
	const summTotal = `Total: ${totalPrice}pts, ${totalGain > 0 ? `& ${totalGain}XP` : ''}${
		totalStream > 0 ? `& ${totalStream} streams` : ''
	} `

	const histCode = `[code]<u4>${currentDate}</u4>, ${itemsHistory.slice(0, -2)}.[/code]`

	const finalCode = `${listItems} \n ${summTotal} \n ${histCode}`

	return <CodeHighlight miw='20rem' withCopyButton language='tsx' code={finalCode} />
}

export default function ShoppingCart() {
	const router = useRouter()
	const { cart } = useCartContext()

	const [cartIsValid, toggleCartIsValid] = useReducer((s) => !s, false)

	const formProject = useForm<{ projects: ProjectItemType[] }>()

	const { fields, append, remove } = useFieldArray({
		control: formProject.control,
		name: 'projects',
	})

	return (
		<Container size='lg'>
			<Group pt='lg' align='stretch' wrap='nowrap'>
				<Stack p='lg' style={{ flexGrow: 2 }}>
					<Title order={1} size={'2.25rem'}>
						Shopping Cart.
					</Title>
					<ScrollArea h={'35vh'}>
						<Table miw={700}>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Item</Table.Th>
									<Table.Th>Quantité</Table.Th>
									<Table.Th>Gain</Table.Th>
									<Table.Th>Prix</Table.Th>
									<Table.Th>Gain Total</Table.Th>
									<Table.Th>Prix Total</Table.Th>
									<Table.Th></Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{cart.map((item, idx) => (
									<ProductRow key={`tr_${item.id}_${idx}`} {...item} />
								))}
							</Table.Tbody>
						</Table>
					</ScrollArea>
					<Group justify='space-between' align='flex-end'>
						<Button
							radius='xl'
							leftSection={<IconArrowBack size={'1rem'} />}
							onClick={() => {
								router.push('/store')
							}}>
							Retour à la boutique
						</Button>
						<Total />
					</Group>
				</Stack>
				<FormProvider {...formProject}>
					{!cartIsValid && (
						<Stack
							mih='45vh'
							miw='25rem'
							p='lg'
							justify='space-between'
							style={(theme) => ({ borderRadius: '1rem', backgroundColor: theme.colors.violet[1] })}>
							<Title order={1} size={'2.25rem'}>
								Projects.
							</Title>
							<ScrollArea h='30vh' px='lg'>
								<Stack>
									{fields.map((project, idx) => {
										return (
											<ProjectItem key={`key_project_${project.id}_${idx}`} index={idx} onRemove={() => remove(idx)} />
										)
									})}
									<Button
										disabled={cart.every((i) => i.type === ProjectTypeEnum.NONE || i.gainType === ItemGainType.STREAM)}
										variant='outline'
										fullWidth
										onClick={() => append(defaultProjectItem)}>
										Ajouter un projet
									</Button>
								</Stack>
							</ScrollArea>
							<Button disabled={cart.length === 0} onClick={toggleCartIsValid}>
								Valider les achats
							</Button>
						</Stack>
					)}
					{cartIsValid && (
						<Stack>
							<Button onClick={toggleCartIsValid} leftSection={<IconArrowBackUp size={'1rem'} />}>
								Retour aux achats
							</Button>
							<TotalCodeHighlight />
						</Stack>
					)}
				</FormProvider>
			</Group>
		</Container>
	)
}
