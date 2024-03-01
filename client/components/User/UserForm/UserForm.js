"use client"

import { baseUrl } from "@/app/globalVariabel"
import { Button, Checkbox, Label, TextInput, Select, Card } from "flowbite-react"
import { useEffect, useState } from "react"

export default function UserForm() {
	const [submitHover, setSubmitHover] = useState(false)
	const [userForm, setUserForm] = useState(null)
	const [hasMounted, setHasMounted] = useState(false)
	const [role, setRole] = useState("")

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

	const submitHandlerNewUser = async (e) => {
		try {
			e.preventDefault()
			if (!userForm.username) {
				throw { name: "Bad Request" }
			}
			const token = sessionStorage.getItem("access_token")
			const response = await fetch(baseUrl + "user", {
				method: "post",
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
				const response = await fetch(baseUrl + `transaction`, {
					method: "get",
					headers: {
						Authorization: `Bearer Key ${token}`,
					},
				})
				if (response.ok) {
					const data = await response.json()
					setRole(data.Role.name)
				} else {
					const data = await response.json()
				}
			} catch (error) {
				console.log("- Error Checking Transaction", error)
			}
		}
		checkUser()
	}, [])
	if (!hasMounted) {
		return null
	}

	if (role !== "Admin" || role === "") {
		return null
	}

	return (
		<Card className="w-full h-fit">
			<form className="flex flex-col gap-4 w-full p-5" onSubmit={submitHandlerNewUser}>
				<div className="max-w-md">
					<div className="mb-2 block">
						<Label htmlFor="username" value="Username" />
					</div>
					<TextInput onChange={onChangeHanlderUserForm} name="username" id="username" type="text" placeholder="Username" required />
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
