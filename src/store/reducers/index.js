import { ADD_ORDER } from '../actions'
import { DELETE_ORDER } from '../actions'

const defaultState = {
	orders: [],
	totalPrice: 0,
	totalCount: 0,
}

export const rootReducer = (state = defaultState, action) => {

	function removeOrder(arr, value) { 
		let index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	switch (action.type) {
		case ADD_ORDER:
			// найти индекс второго бургера
			let is_chosen = state.orders.findIndex(
				(item) => item.title === action.payload.title,  // 1 burg
			)
			// если индекс не равен -1, то сделать перезапись,
			//  а если равен -1 то это означает что массив пустой и просто добавит 1 элемент
			if (is_chosen !== -1) {
				// стордун ордерс ключун копиясын жасайбыз
				let arr = [...state.orders]
				// orders тен is_chosen индекс мн  бизге керектуу элементти таап count деген ключун перезапись кылабыз
				arr[is_chosen].count = arr[is_chosen].count + 1
				arr[is_chosen].sum = arr[is_chosen].sum + action.payload.price
				return {
					...state,
					orders: arr,
				}
			} else {
				return {
					...state,
					orders: [
						...state.orders,
						{
							title: action.payload.title,
							price: action.payload.price,
							count: 1,
							sum: action.payload.price,
						},
					],
				}
			}
		case DELETE_ORDER:
			// findIndex
			let is_chosen2 = state.orders.findIndex(
				(item) => item.title === action.payload.title,
			)
			let arr = [...state.orders]
			const price = arr[is_chosen2].price
			if (action.payload.count < 2) {
				// стордун orders  ключтун копиясы
				console.log(state.orders[is_chosen2])
				removeOrder(state.orders, state.orders[is_chosen2])
				return {
					...state,
					orders: [...state.orders],
				}
			} else {
				// тут мы перезаписываем count элемента, найдя его по индексу.
				arr[is_chosen2].count = arr[is_chosen2].count - 1
				arr[is_chosen2].sum = arr[is_chosen2].sum - price
				return {
					...state,
					orders: arr,
				}
			}
		default:
			return state
	}
}
// export const rootReducer = (state = defaultState, action) => {
// 	switch (action.type) {
// 		case ADD_ORDER:
// 			return {
// 				...state,
// 				orders: [
// 					...state.orders,
// 					{
// 						title: action.payload.title,
// 						price: action.payload.price,
// 					},
// 				],
// 			}

// 		default:
// 			return state
// 	}
// }
