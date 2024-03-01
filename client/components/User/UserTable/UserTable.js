"use client"

import { baseUrl } from "@/app/globalVariabel"
import { Button, Card } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function UserTable() {
	const [users, setUsers] = useState(null)
	const [hasMounted, setHasMounted] = useState(false)
	const [role, setRole] = useState("")

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
					setUsers(data.Users)
				} else {
					const data = await response.json()
				}
			} catch (error) {
				console.log("- Error Checking Transaction")
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

	const deleteUser = async (id) => {
		try {
			const token = sessionStorage.getItem("access_token")
			const response = await fetch(baseUrl + `user/${id}`, {
				method: "delete",
				headers: {
					Authorization: `Bearer Key ${token}`,
				},
			})
			if (response.ok) {
				const data = await response.json()
				console.log(data)
			} else {
				const data = await response.json()
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Card className="w-full" style={{ height: "50vh" }}>
			<div className="w-full h-screen p-5 flex justify-center align-center flex-wrap overflow-x-hidden">
				<section className="w-full">
					<div className="relative overflow-x-auto">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr className="text-left">
									<th scope="col" className="py-3">
										No.
									</th>
									<th scope="col" className="py-3">
										Name
									</th>
									<th scope="col" className="py-3">
										Status
									</th>
									<th scope="col" className="py-3">
										Transaction
									</th>
									<th scope="col" className="py-3">
										City
									</th>
									<th scope="col" className="py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{users &&
									users.map((data, index) => {
										return (
											<tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
												<th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{index + 1}
												</th>
												<td className="py-4">{data.name}</td>
												<td className="py-4">{data.status ? "Active" : "Inactive"}</td>
												{data.Transactions && data.Transactions.length > 0 ? (
													<td className="py-4">
														<ul className="text-gray-500 list-disc list-inside dark:text-gray-400">
															{data.Transactions.map((data, index) => {
																return <li key={index}>{data.title}</li>
															})}
														</ul>
													</td>
												) : (
													<td className="py-4">No transaction</td>
												)}
												<td className="py-4">{data.City.name}</td>
												<td className="py-4 flex justify-evenly items-center">
													<Button as={Link} href={`/user/update/${data.id}`} size="xs" color="blue">
														Update
													</Button>
													<Button
														size="xs"
														color="failure"
														onClick={() => {
															deleteUser(data.id)
														}}
													>
														Delete
													</Button>
												</td>
											</tr>
										)
									})}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</Card>
	)
}
