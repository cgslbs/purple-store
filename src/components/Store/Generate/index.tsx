'use client'

import { DEFAULT_ITEM } from '@/constants/item'
import { StoreGroupsEnum, StoreSectionEnum } from '@/constants/store'
import { StoreByGroup } from '@/interfaces'
import { CodeHighlight } from '@mantine/code-highlight'
import {
	ActionIcon,
	Button,
	Container,
	Flex,
	Group,
	NumberInput,
	Select,
	Stack,
	TextInput,
	Textarea,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Control, Controller, UseFormRegister, useFieldArray, useForm } from 'react-hook-form'

type NestedTypeProps = {
	index: number
	control: Control<StoreByGroup, any>
	register: UseFormRegister<StoreByGroup>
}

type ItemSelectorProps = {
	index: number
	idx: number
	control: Control<StoreByGroup, any>
}

const ItemSelector = ({ idx, control, index }: ItemSelectorProps) => {
	return (
		<Controller
			control={control}
			name={`sectionItems.${index}.items.${idx}`}
			render={({ field }) => (
				<Select
					searchable
					label='Item'
					data={DEFAULT_ITEM.map((item) => ({
						value: item.id.toString(),
						label: item.name,
					}))}
					value={field.value !== undefined ? field.value.id.toString() : ''}
					onChange={(id) => {
						if (id === null) return
						const currentItem = DEFAULT_ITEM.find((item) => item.id === Number(id))
						if (!currentItem) return
						field.onChange(currentItem)
					}}
				/>
			)}
		/>
	)
}

const NestedItem = ({ control, index, register }: NestedTypeProps) => {
	const defaultItem = DEFAULT_ITEM[0]
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: `sectionItems.${index}.items`, // unique name for your Field Array
		// eslint-disable-next-line prettier/prettier
	})

	return (
		<Stack>
			{fields.map((item, idx) => {
				return (
					<Flex key={`ITEM_${idx}`} gap='md' justify='flex-start' align='flex-end' direction='row' wrap='wrap'>
						<ItemSelector control={control} idx={idx} index={index} />
						<TextInput label='Condition' {...register(`sectionItems.${index}.items.${idx}.condition`)} />
						<Controller
							control={control}
							name={`sectionItems.${index}.items.${idx}.price`}
							render={({ field }) => (
								<NumberInput
									label='Prix'
									value={field.value}
									onChange={(v) => {
										field.onChange(Number(v))
									}}
								/>
							)}
						/>
						<Controller
							control={control}
							name={`sectionItems.${index}.items.${idx}.gain`}
							render={({ field }) => (
								<NumberInput
									label='Gain'
									value={field.value}
									onChange={(v) => {
										field.onChange(Number(v))
									}}
								/>
							)}
						/>
						<ActionIcon variant='outline' color='red' aria-label='Remove' onClick={() => remove(idx)}>
							<IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
						</ActionIcon>
					</Flex>
				)
			})}
			<Button
				color='grape'
				onClick={() => {
					append({ ...defaultItem, gain: 0, price: 0 })
				}}>
				Ajouter un item
			</Button>
		</Stack>
	)
}

export function StoreGenerator() {
	// CREATE DATA DYNAMICALLY
	const [store, setStore] = useState('')
	const { register, control, handleSubmit, watch } = useForm<StoreByGroup>({
		defaultValues: {
			title: 'Boutique groupe',
			id: StoreGroupsEnum.GROUP,
			sectionItems: [],
		},
	})
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'sectionItems', // unique name for your Field Array
		// eslint-disable-next-line prettier/prettier
	})

	const generateStore = handleSubmit((data) => {
		setStore(JSON.stringify(data))
	})

	return (
		<Container size='md'>
			<Stack>
				<TextInput label='Titre Boutique' {...register('title')} />
				{fields.map((section, idx) => {
					return (
						<Stack key={`section_${idx}`}>
							<TextInput color='pink' label='Titre section' {...register(`sectionItems.${idx}.title`)} />
							<Textarea color='pink' label='Description section' {...register(`sectionItems.${idx}.description`)} />
							<NestedItem index={idx} {...{ register, control }} />
							<Group>
								<Button color='red' onClick={() => remove(idx)}>
									Remove Section
								</Button>
							</Group>
						</Stack>
					)
				})}
				<Button
					color='green'
					onClick={() => {
						append({
							id: StoreSectionEnum.PROJECT,
							title: '',
							description: '',
							items: [],
						})
					}}>
					Ajouter une nouvelle section
				</Button>
				<CodeHighlight code={`${store}`} language='json' copyLabel='Copy button code' copiedLabel='Copied!' />
				<Button onClick={generateStore}>Générer la boutique</Button>
			</Stack>
		</Container>
	)
}
