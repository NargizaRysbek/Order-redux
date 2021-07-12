import React from 'react'
import { data } from '../../store/data'
import { useSelector, useDispatch } from 'react-redux'
import { add_order, delete_order } from '../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/lab/Skeleton'
import DeleteIcon from '@material-ui/icons/Delete'
//alert
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { createMuiTheme } from '@material-ui/core'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

export const OrderBasket = () => {
	const dispatch = useDispatch()
	const orders = useSelector((state) => state.orders)

	// alert
	const [open, setOpen] = React.useState(false)
	const handleClick = () => {
		setOpen(true)
	}
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}
	const [openDel, setOpenDel] = React.useState(false)
	const deleteClick = () => {
		setOpenDel(true)
	}

	const deleteClick2 = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenDel(false)
	}

	return (
		<div style={styles.orderContainer}>
			<div style={styles.menuContainer}>
				<h1>Menu</h1>
				<MenuList>
					{data.map((el, id) => {
						// биякта оnclick деген событие кошуп диспатч менен сторго объект жонотосунор

						return (
							<Tooltip title='Добавить в заказы'>
								<MenuItem
								    onClick={ (e) => {dispatch(add_order(el)); handleClick(e) }} 
									style={{ cursor: 'pointer' }}
									key={id}
								>
									{el.title} -<b>price: {el.price}</b>
								</MenuItem>
							</Tooltip>
						)
					})}
				</MenuList>
			</div>
			<div style={styles.basketContainer}>
				<h1>Orders</h1>
				<MenuList>
					{
						// Биякта orders деген ключту стордон чыгарып рендер кыласынар
						orders.length ? (
							orders.map((el, id) => {
								return (
									<MenuItem key={id}>
										{el.title}
										<b>
											: price: {el.price} * {el.count} ={' '}
											{el.sum}{' '}
										</b>
										<span
											onClick={(e) =>
												dispatch(
													delete_order(el),
													deleteClick(e),
												)
											}
										>
											<DeleteIcon />
										</span>
									</MenuItem>
								)
							})
						) : (
							<div>
								<Skeleton />
								<Skeleton animation={false} />
								<Skeleton animation='wave' />
							</div>
						)
					}
					
					<Snackbar
						open={open}
						autoHideDuration={1200}
						onClose={handleClose}
					>
						<Alert onClose={handleClose} severity='success'>
							Заказ успешно добавлен!
						</Alert>
					</Snackbar>
					<Snackbar
						open={openDel}
						autoHideDuration={1200}
						onClose={deleteClick2}
					>
						<Alert severity='info'>Заказ успешно удален!</Alert>
					</Snackbar>
				</MenuList>
			</div>
		</div>
	)
}

const styles = {
	orderContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	menuContainer: {
		width: '50%',
	},
	basketContainer: {
		width: '50%',
	},
}

{
	/* <MenuItem key={id}>
										{el.title} 
                                        <b>: price: {el.price}</b>
                                        <b>-count: {el.count}</b>
									</MenuItem> */
}
