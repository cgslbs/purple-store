import { CompleteItem } from '@/interfaces'
import { Dispatch, ReactNode, Reducer, createContext, useContext, useMemo, useReducer } from 'react'

export type CartItemType = CompleteItem & {
	quantity: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

export enum CartActionEnum {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	INCREASE_QTY,
	DECREASE_QTY,
	CLEAR,
	ADD_SONG,
	ADD_LINK,
}

type CartActionType = CartActionEnum

type CartReducerAction = {
	type: CartActionType
	payload?: CompleteItem
}

const reducer: Reducer<CartStateType, CartReducerAction> = (state: CartStateType, action: CartReducerAction) => {
	switch (action.type) {
		case CartActionEnum.ADD_TO_CART: {
			// add to cart
			if (!action.payload) {
				throw new Error('Payload missing in add to cart action')
			}

			const currentItem = action.payload
			// remove item from cart
			const filteredCart: CartItemType[] = state.cart.filter((item) => item.id !== currentItem.id)

			const itemExist = state.cart.find((item) => item.id === currentItem.id)
			const updateQty = itemExist ? itemExist.quantity + 1 : 1

			const newItem = { ...currentItem, quantity: updateQty }

			return { ...state, cart: [...filteredCart, newItem] }
		}
		case CartActionEnum.REMOVE_FROM_CART: {
			// remove from cart
			if (!action.payload || state.cart.length === 0) {
				throw new Error('Payload missing in remove to cart action')
			}

			const { id } = action.payload
			const filteredCart = state.cart.filter((item) => item.id !== id)

			return { ...state, cart: filteredCart }
		}
		case CartActionEnum.INCREASE_QTY: {
			// increase cart quantity
			if (!action.payload) {
				throw new Error('Payload missing in increase quantity action')
			}
			const currentItem = action.payload
			const itemExist = state.cart.find((item) => item.id === currentItem.id)
			if (!itemExist) {
				throw new Error('Item does not exist, has to be added to cart')
			}

			const updateItem = { ...itemExist, quantity: itemExist.quantity + 1 }
			const filteredCart = state.cart.filter((item) => item.id !== currentItem.id)

			return { ...state, cart: [...filteredCart, updateItem] }
		}
		case CartActionEnum.DECREASE_QTY: {
			// increase cart quantity
			if (!action.payload) {
				throw new Error('Payload missing in decrease quantity action')
			}
			const currentItem = action.payload
			const itemExist = state.cart.find((item) => item.id === currentItem.id)
			if (!itemExist) {
				throw new Error('Item does not exist, has to be added to cart')
			}

			const updateItem = { ...itemExist, quantity: itemExist.quantity - 1 }
			const filteredCart = state.cart.filter((item) => item.id !== currentItem.id)

			return { ...state, cart: [...filteredCart, updateItem] }
		}
		case CartActionEnum.CLEAR:
			// clear the cart
			return { ...state, cart: [] }

		case CartActionEnum.ADD_SONG: {
			// associate a song to the item
			if (!action.payload) {
				throw new Error('Payload missing in increase quantity action')
			}
			const currentItem = action.payload
			const itemExist = state.cart.find((item) => item.id === currentItem.id)
			if (!itemExist) {
				throw new Error('Item does not exist, has to be added to cart')
			}

			const updateItem: CartItemType = {
				...itemExist,
				title: currentItem.title,
				artist: currentItem.artist,
				releaseDate: currentItem.releaseDate,
			}
			const filteredCart = state.cart.filter((item) => item.id !== currentItem.id)

			return { ...state, cart: [...filteredCart, updateItem] }
		}
		case CartActionEnum.ADD_LINK: {
			// associate a link to the item
			if (!action.payload) {
				throw new Error('Payload missing in increase quantity action')
			}
			const currentItem = action.payload
			const itemExist = state.cart.find((item) => item.id === currentItem.id)
			if (!itemExist) {
				throw new Error('Item does not exist, has to be added to cart')
			}

			const updateItem: CartItemType = {
				...itemExist,
				title: currentItem.title,
				link: currentItem.link,
			}
			const filteredCart = state.cart.filter((item) => item.id !== currentItem.id)

			return { ...state, cart: [...filteredCart, updateItem] }
		}
		default:
			return { ...state }
	}
}

type CartContextType = {
	dispatch: Dispatch<CartReducerAction>
	REDUCER_ACTIONS: typeof CartActionEnum
	totalItems: number
	totalPrice: number
	totalGain: number
	totalStream: number
	totalDoubleGain: number
	cart: CartItemType[]
	isOpened: boolean
	toggleCart: () => void
}

const initCartContextState: CartContextType = {
	dispatch: () => {},
	REDUCER_ACTIONS: CartActionEnum,
	totalItems: 0,
	totalPrice: 0,
	totalGain: 0,
	totalDoubleGain: 0,
	totalStream: 0,
	cart: [],
	isOpened: false,
	toggleCart: () => null,
}

export const CartContext = createContext<CartContextType>(initCartContextState)

type CartContextProviderProps = {
	children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
	const [state, dispatch] = useReducer(reducer, initCartState)

	const [isOpened, toggleCart] = useReducer((s) => !s, false)

	const REDUCER_ACTIONS = useMemo(() => {
		return CartActionEnum
	}, [])

	const totalItems = state.cart.reduce((previousValue, cartItem) => {
		return previousValue + cartItem.quantity
	}, 0)

	const totalPrice = state.cart.reduce((previousValue, cartItem) => {
		return previousValue + cartItem.quantity * cartItem.price
	}, 0)

	const totalGain = state.cart
		.filter((i) => !i.isBooster)
		.reduce((previousValue, cartItem) => {
			return previousValue + cartItem.gain * cartItem.quantity
		}, 0)

	const totalStream = state.cart
		.filter((i) => i.isBooster)
		.reduce((previousValue, cartItem) => {
			return previousValue + cartItem.gain * cartItem.quantity
		}, 0)

	const totalDoubleGain = state.cart
		.filter((i) => i.isBooster && !!i.doubleGain)
		.reduce((previousValue, cartItem) => {
			return previousValue + cartItem.doubleGain! * cartItem.quantity
		}, 0)

	const cart = state.cart.sort((a, b) => {
		const itemA = a.id
		const itemB = b.id
		return itemA - itemB
	})

	return (
		<CartContext.Provider
			value={{
				dispatch,
				REDUCER_ACTIONS,
				totalItems,
				totalDoubleGain,
				totalGain,
				totalStream,
				totalPrice,
				cart,
				isOpened,
				toggleCart,
			}}>
			{children}
		</CartContext.Provider>
	)
}

export function useCartContext() {
	return useContext(CartContext)
}
