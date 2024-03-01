"use client"

import { baseUrl } from "@/app/globalVariabel"
import { Button, Checkbox, Label, TextInput, Select, List, Datepicker, Card } from "flowbite-react"
import moment from "moment"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function TransactionUpdate() {
	const param = useParams()
	const idTransaction = param.id
	const [submitHover, setSubmitHover] = useState(false)
	const [users, setUsers] = useState(null)
	const [transactionForm, setTransactionForm] = useState(null)
	const [hasMounted, setHasMounted] = useState(false)
	const [selectedUser, setSelectedUser] = useState({ userId: undefined, username: undefined })
	const [selectedUsers, setSelectedUsers] = useState([])
	const [valid, setValid] = useState(false)

	const onChangeHanlderTransactionForm = (e) => {
		try {
			const { name, value } = e.target
			setTransactionForm((prevState) => ({
				...prevState,
				[name]: value,
			}))
		} catch (error) {
			console.log(error)
		}
	}

	const onChangeSelect = (e) => {
		try {
			const id = e.target.value
			const username = e.target.options[e.target.selectedIndex].text
			setSelectedUser({ userId: id, username })
		} catch (error) {
			console.log(error)
		}
	}

	const addUser = (e) => {
		try {
			const isExist = selectedUsers.find((data) => data.userId == selectedUser.userId)

			if (isExist) {
				throw { name: "User is already exist" }
			}

			setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, selectedUser])
		} catch (error) {
			console.log(error)
		}
	}

	const deleteUser = (id) => {
		const updatedUsers = selectedUsers.filter((data) => data.userId !== id)
		setSelectedUsers(updatedUsers)
	}

	const submitHandlerUpdateTransaction = async (e) => {
		try {
			const sendData = { ...transactionForm, users: selectedUsers }
			e.preventDefault()
			if (!transactionForm.title || !transactionForm.transaction_date) {
				throw { name: "Bad Request" }
			}
			const token = sessionStorage.getItem("access_token")
			const response = await fetch(baseUrl + `transaction/${idTransaction}`, {
				method: "put",
				headers: {
					Authorization: `Bearer Key ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendData),
			})

			if (response.ok) {
				const { message } = await response.json()
				console.log(message)
			} else {
				const data = await response.json()
				console.log("- Error ", data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setHasMounted(true)

		const checkTransaction = async () => {
			try {
				const token = sessionStorage.getItem("access_token")
				const response = await fetch(baseUrl + `transaction/${idTransaction}`, {
					method: "get",
					headers: {
						Authorization: `Bearer Key ${token}`,
					},
				})
				if (response.ok) {
					const data = await response.json()
					setTransactionForm({ title: data?.title, transaction_date: data?.transaction_date })
					setUsers(data?.Administrator?.Users)
					setValid(true)
					if (data?.Users?.length > 0) {
						const initialSelectedUsers = data?.Users?.map((user) => {
							return { userId: user.id, username: user.name }
						})
						setSelectedUsers(initialSelectedUsers)
						setSelectedUser({ userId: data.Users[0].id, username: data.Users[0].name })
					}
				} else {
					const data = await response.json()
					setValid(false)
					console.log(data)
				}
			} catch (error) {
				setValid(false)
				console.log("- Error Checking Transaction", error)
			}
		}
		checkTransaction()
	}, [])
	if (!hasMounted) {
		return null
	}

	if (!valid) {
		return null
	}

	return (
		<Card className="w-full h-fit">
			<form className="flex flex-col gap-4 w-full p-5" onSubmit={submitHandlerUpdateTransaction}>
				<div className="max-w-md">
					<div className="mb-2 block">
						<Label htmlFor="title" value="Title" />
					</div>
					<TextInput
						onChange={onChangeHanlderTransactionForm}
						defaultValue={transactionForm?.title}
						name="title"
						id="title"
						type="text"
						placeholder="Transaction Title"
						required
					/>
				</div>
				<div className="max-w-md">
					<div className="mb-2 block">
						<Label htmlFor="add-users" value="Add Users" />
					</div>
					<Select id="users" onChange={onChangeSelect} required name="user">
						<option value="" disabled>
							Select User
						</option>
						{users && users.length > 0 ? (
							users.map((data, index) => {
								return (
									<option value={data.id} className="py-10" id={`user-${data.name}`} key={data.id}>
										{data.name}
									</option>
								)
							})
						) : (
							<option value="" id="no-user" disabled>
								No User
							</option>
						)}
					</Select>
					<Button className="my-5" color="blue" onClick={addUser}>
						Add
					</Button>
					<List>
						{selectedUsers.map((data) => {
							return (
								<List.Item className="flex items-center justify-between" key={data.userId}>
									{data.username}{" "}
									<span>
										<Button
											size={"xs"}
											color="failure"
											onClick={() => {
												deleteUser(data.userId)
											}}
										>
											Delete
										</Button>
									</span>
								</List.Item>
							)
						})}
					</List>
				</div>
				<div className="max-w-md">
					<div className="mb-2 block">
						<Label htmlFor="title" value="Title" />
					</div>
					<input
						required
						name="transaction_date"
						defaultValue={transactionForm?.transaction_date ? moment(transactionForm?.transaction_date).format("YYYY-MM-DDTHH:mm") : ""}
						type="datetime-local"
						onChange={onChangeHanlderTransactionForm}
						step="1" // Ensure seconds are also displayed
					/>

					{/* <Datepicker color={"red"} minDate={new Date(2023, 0, 1)} maxDate={new Date(2025, 3, 30)} />; */}
				</div>
				<Button
					onMouseEnter={() => {
						setSubmitHover(true)
					}}
					onMouseLeave={() => {
						setSubmitHover(false)
					}}
					style={{ backgroundColor: submitHover ? "green" : "blue" }}
					className="w-1/2 mx-auto"
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Card>
	)
}
