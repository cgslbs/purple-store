/* eslint-disable react/no-unescaped-entities */
'use client'

import {
	Group,
	Rating,
	Stack,
	TextInput,
	Text,
	NumberFormatter,
	Checkbox,
	Button,
	Badge,
	ActionIcon,
	NumberInput,
	Select,
	Switch,
	Kbd,
	Tooltip,
} from '@mantine/core'
import { RatingValues, useSongRateForm } from './use-song-rate-form'
import { Controller, useFieldArray } from 'react-hook-form'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { IconBrandYoutubeFilled, IconLinkPlus, IconTrashXFilled } from '@tabler/icons-react'
import { SELECT_CATEGROY } from './song-rate.constants'
import { ParticipantCategory } from '@/interfaces'
import { AGENCIES } from '@/constants/agency'

type RatingByParticipantProps = {
	idx: number
}

type ParticipantQtyProp = RatingByParticipantProps & {
	category: ParticipantCategory
}
type ParticipantRatingProp = ParticipantQtyProp & {
	qty: number
}

type DefaultStreamsProps = {
	udgArtist: boolean
}

const ParticipantQty = ({ idx, category }: ParticipantQtyProp) => {
	const { form } = useSongRateForm()
	return (
		<Controller
			control={form.control}
			defaultValue={1}
			name={`participant.${idx}.qty`}
			render={({ field }) => (
				<>
					<NumberInput
						label='Nb prod.'
						value={field.value}
						onChange={(val) => {
							field.onChange(+val)
						}}
					/>
					<ParticpantRating idx={idx} category={category} qty={field.value} />
				</>
			)}
		/>
	)
}

const ParticpantRating = ({ idx, category, qty }: ParticipantRatingProp) => {
	const { form, formStreams } = useSongRateForm()

	const [isTrainee, setIsTrainee] = useState(false)
	const ratingValues = RatingValues[category]

	const additionnalStreams = useCallback(
		(value: number) => {
			const streamsByProd: number[] = []
			for (let index = 0; index < qty - 1; index++) {
				streamsByProd.push(ratingValues[value - 1] / 2)
			}
			return streamsByProd
		},
		[qty]
	)

	useEffect(() => {
		if (category === 'TRAINEE') {
			setIsTrainee(true)
			form.setValue(`participant.${idx}.rating`, 1)
		}
		if (category !== 'TRAINEE' && isTrainee) {
			setIsTrainee(false)
		}
	}, [category])

	return (
		<Controller
			control={form.control}
			defaultValue={1}
			name={`participant.${idx}.rating`}
			render={({ field }) => (
				<Stack gap='xs'>
					<Text size='sm' fw={500}>
						Nombre d'étoiles
					</Text>
					<Group gap='xs'>
						<Rating count={isTrainee ? 1 : 5} value={field.value} onChange={field.onChange} />
						{qty > 1 && (
							<div>
								<Kbd>{ratingValues[field.value - 1]}</Kbd> +{' '}
								<Kbd>{(ratingValues[field.value - 1] / 2) * (qty - 1)}</Kbd>
							</div>
						)}
						<NumberFormatter
							suffix=' streams'
							thousandSeparator
							value={
								qty > 1
									? additionnalStreams(field.value).reduce((prev, curr) => prev + curr, ratingValues[field.value - 1])
									: ratingValues[field.value - 1]
							}
						/>
					</Group>
				</Stack>
			)}
		/>
	)
}

const SelectParticipantCategory = ({ idx }: RatingByParticipantProps) => {
	const { form } = useSongRateForm()

	return (
		<Controller
			control={form.control}
			defaultValue='AUTO-PROD'
			name={`participant.${idx}.category`}
			render={({ field }) => (
				<Group align='end'>
					<Select label='Categorie' data={SELECT_CATEGROY} value={field.value} onChange={field.onChange} />
					<ParticipantQty idx={idx} category={field.value ? field.value : 'AUTO-PROD'} />
				</Group>
			)}
		/>
	)
}

const ParticipantForm = () => {
	const { form } = useSongRateForm()
	const { register, control } = form

	const { fields, append, remove } = useFieldArray({
		control: control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'participant', // unique name for your Field Array
	})

	return (
		<Stack>
			<Badge>Participant</Badge>
			{fields.map((artist, idx) => (
				<Stack key={`${artist.fullname}`}>
					<TextInput label='Nom & Prénom' {...register(`participant.${idx}.fullname`)} />
					<Group align='end'>
						<SelectParticipantCategory idx={idx} />
						<ActionIcon variant='outline' color='red' onClick={() => remove(idx)}>
							<IconTrashXFilled size={16} />
						</ActionIcon>
					</Group>
				</Stack>
			))}
			<Button radius='sm' onClick={() => append({ fullname: '', rating: 1, qty: 1 })}>
				Ajouter un participant
			</Button>
		</Stack>
	)
}

const CollabRating = ({ idx }: RatingByParticipantProps) => {
	const { form } = useSongRateForm()
	const [value, setValue] = useState(1)

	return (
		<Controller
			control={form.control}
			defaultValue={7500}
			name={`collabArtist.${idx}.rating`}
			render={({ field }) => (
				<Group gap='xs'>
					<Rating
						value={value}
						onChange={(star) => {
							setValue(star)
							switch (star) {
								case 2:
									field.onChange(60000 / 2)
									break
								case 3:
									field.onChange(120000 / 2)
									break
								case 4:
									field.onChange(240000 / 2)
									break
								case 5:
									field.onChange(480000 / 2)
									break

								case 1:
								default:
									field.onChange(30000 / 2)
									break
							}
						}}
					/>
					<NumberFormatter suffix=' streams' thousandSeparator value={field.value} />
				</Group>
			)}
		/>
	)
}

const CollabForm = () => {
	const { form } = useSongRateForm()
	const { register, control } = form

	const { fields, append, remove } = useFieldArray({
		control: control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'featArtist', // unique name for your Field Array
	})

	return (
		<Stack>
			<Badge color='indigo'>COLLABORATION</Badge>
			{fields.map((artist, idx) => (
				<Group key={`${artist.fullname}`} align='end' w={'100%'}>
					<TextInput style={{ flexGrow: 2 }} label='Nom & Prénom' {...register(`collabArtist.${idx}.fullname`)} />
					<Stack style={{ flexGrow: 2 }} gap='xs'>
						<Text size='sm' fw={500}>
							Nombre d'étoiles
						</Text>
						<CollabRating idx={idx} />
					</Stack>
					<ActionIcon variant='outline' color='red' onClick={() => remove(idx)}>
						<IconTrashXFilled size={16} />
					</ActionIcon>
				</Group>
			))}
			<Button color='indigo' radius='sm' onClick={() => append({ fullname: '', rating: 1, qty: 1 })}>
				Ajouter un artiste en collaboration
			</Button>
		</Stack>
	)
}

const FeatRating = ({ idx }: RatingByParticipantProps) => {
	const { form } = useSongRateForm()
	const [value, setValue] = useState(1)

	return (
		<Controller
			control={form.control}
			defaultValue={7500}
			name={`featArtist.${idx}.rating`}
			render={({ field }) => (
				<Group gap='xs'>
					<Rating
						value={value}
						onChange={(star) => {
							setValue(star)
							switch (star) {
								case 2:
									field.onChange(15000)
									break
								case 3:
									field.onChange(30000)
									break
								case 4:
									field.onChange(60000)
									break
								case 5:
									field.onChange(120000)
									break

								case 1:
								default:
									field.onChange(7500)
									break
							}
						}}
					/>
					<NumberFormatter suffix=' streams' thousandSeparator value={field.value} />
				</Group>
			)}
		/>
	)
}

const FeaturingForm = () => {
	const { form } = useSongRateForm()
	const { register, control } = form

	const { fields, append, remove } = useFieldArray({
		control: control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'featArtist', // unique name for your Field Array
	})

	return (
		<Stack>
			<Badge color='lime'>FEATURING</Badge>
			{fields.map((artist, idx) => (
				<Group key={`${artist.fullname}`} align='end' w={'100%'}>
					<TextInput style={{ flexGrow: 2 }} label='Nom & Prénom' {...register(`featArtist.${idx}.fullname`)} />
					<Stack style={{ flexGrow: 2 }} gap='xs'>
						<Text size='sm' fw={500}>
							Nombre d'étoiles
						</Text>
						<FeatRating idx={idx} />
					</Stack>
					<ActionIcon variant='outline' color='red' onClick={() => remove(idx)}>
						<IconTrashXFilled size={16} />
					</ActionIcon>
				</Group>
			))}
			<Button color='lime' radius='sm' onClick={() => append({ fullname: '', rating: 1, qty: 1 })}>
				Ajouter un artiste en featuring
			</Button>
		</Stack>
	)
}

const DefaultRatingForm = ({ udgArtist }: DefaultStreamsProps) => {
	const { formStreams, form } = useSongRateForm()
	const [value, setValue] = useState(1)

	useEffect(() => {
		form.setValue('artistRate', 1)
		setValue(1)
		formStreams.setValue('defaultStreams', udgArtist ? 30000 / 2 : 30000)
	}, [udgArtist])

	return (
		<Controller
			control={formStreams.control}
			name='defaultStreams'
			render={({ field }) => (
				<Group gap='xs'>
					<Rating
						value={value}
						onChange={(star) => {
							setValue(star)
							form.setValue('artistRate', star)
							switch (star) {
								case 2:
									field.onChange(udgArtist ? 60000 / 2 : 60000)
									break
								case 3:
									field.onChange(udgArtist ? 120000 / 2 : 120000)
									break
								case 4:
									field.onChange(udgArtist ? 240000 / 2 : 240000)
									break
								case 5:
									field.onChange(udgArtist ? 480000 / 2 : 480000)
									break

								case 1:
								default:
									field.onChange(udgArtist ? 30000 / 2 : 30000)
									break
							}
						}}
					/>
					<NumberFormatter suffix=' streams' thousandSeparator value={field.value} />
				</Group>
			)}
		/>
	)
}

const Boosters = () => {
	const { formStreams } = useSongRateForm()

	return (
		<Controller
			control={formStreams.control}
			name='bonusStreams'
			render={({ field }) => (
				<NumberInput
					label='Streams achetés'
					value={field.value}
					onChange={(val) => {
						field.onChange(+val)
					}}
				/>
			)}
		/>
	)
}

export function SongRate() {
	const { form, updateAgency } = useSongRateForm()
	const { register, setValue } = form

	const [isFeat, toggleIsFeat] = useReducer((s) => !s, false)
	const [isCollab, toggleIsCollab] = useReducer((s) => !s, false)
	const [udgArtist, toggleUdgArtist] = useReducer((s) => !s, false)

	useEffect(() => {
		if (isCollab) return
		setValue('collabArtist', [])
	}, [isCollab])

	useEffect(() => {
		if (isFeat) return
		setValue('featArtist', [])
	}, [isFeat])

	return (
		<Stack>
			<Group>
				{AGENCIES.map((agency) => (
					<Tooltip key={agency.label} label={agency.label}>
						<ActionIcon
							variant='filled'
							size='xl'
							radius='xl'
							aria-label={agency.label}
							color={agency.color}
							onClick={() => updateAgency(agency.value)}>
							<agency.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				))}
			</Group>
			<Group align='end' grow>
				<TextInput label='Titre de la chanson' {...register('songTitle')} />
				<TextInput label='Artiste' {...register('artist')} />
				<Switch label='Artist underground' checked={udgArtist} onChange={toggleUdgArtist} />
			</Group>
			<TextInput label='Release date' placeholder='DD.MM.YY' {...register('releaseDate')} />
			<Stack gap='xs'>
				<Text size='sm' fw={500}>
					Nombre d'étoiles
				</Text>
				<DefaultRatingForm udgArtist={udgArtist} />
			</Stack>
			<Group>
				<Checkbox color='lime' label='Featuring' checked={isFeat} onChange={toggleIsFeat} />
				<Checkbox color='indigo' label='Collaboration' checked={isCollab} onChange={toggleIsCollab} />
			</Group>
			{isFeat && <FeaturingForm />}
			{isCollab && <CollabForm />}
			<Boosters />
			<ParticipantForm />
			<Group align='end' grow>
				<TextInput leftSection={<IconBrandYoutubeFilled size={16} />} label='Code youtube' {...register('ytb_code')} />
				<TextInput leftSection={<IconLinkPlus size={16} />} label='Cover album' {...register('img_url')} />
			</Group>
			<Button>Générer le code</Button>
		</Stack>
	)
}
