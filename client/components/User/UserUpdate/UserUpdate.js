"use client"

import { baseUrl } from "@/app/globalVariabel"
import { Button, Checkbox, Label, TextInput, Select, Card } from "flowbite-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function UserUpdate() {
	const param = useParams()
	const idUser = param.id
	const [submitHover, setSubmitHover] = useState(false)
	const [userForm, setUserForm] = useState(null)
	const [hasMounted, setHasMounted] = useState(false)
	const [valid, setValid] = useState(false)

	const onChangeHanlderUserForm = (e) => {
		try {
			const { name, value } = e.target
			setUserForm((prevState) => ({
				...prevState,
				[name]: value,
			}))
		} catch (error) {
			console.log(error)
		}
	}

	const submitHandlerUpdateUser = async (e) => {
		try {
			e.preventDefault()
			if (!userForm.username) {
				throw { name: "Bad Request" }
			}
			const token = sessionStorage.getItem("access_token")
			const response = await fetch(baseUrl + `user/${idUser}`, {
				method: "put",
				headers: {
					Authorization: `Bearer Key ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userForm),
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

		const checkUser = async () => {
			try {
				const token = sessionStorage.getItem("access_token")
				const response = await fetch(baseUrl + `user/${idUser}`, {
					method: "get",
					headers: {
						Authorization: `Bearer Key ${token}`,
					},
				})
				if (response.ok) {
					const data = await response.json()
					setUserForm({ username: data.name })
					setValid(true)
				} else {
					setValid(false)
					const data = await response.json()
				}
			} catch (error) {
				setValid(false)
				console.log("- Error Checking Transaction", error)
			}
		}
		checkUser()
	}, [])
	if (!hasMounted && !valid) {
		return null
	}

	return (
		<Card className="w-full h-fit">
			<form className="flex flex-col gap-4 w-full p-5" onSubmit={submitHandlerUpdateUser}>
				<div className="max-w-md">
					<div className="mb-2 block">
						<Label htmlFor="username" value="Username" />
					</div>
					<TextInput
						onChange={onChangeHanlderUserForm}
						defaultValue={userForm?.username}
						name="username"
						id="username"
						type="text"
						placeholder="Username"
						required
					/>
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
