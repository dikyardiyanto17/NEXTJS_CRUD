"use client"

import { baseUrl, dateFormat } from "@/app/globalVariabel"
import { Button, Card } from "flowbite-react"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function TransactionTable() {
	const [transactions, setTransactions] = useState(null)
	const [hasMounted, setHasMounted] = useState(false)
	const [role, setRole] = useState("")

	useEffect(() => {
		setHasMounted(true)
		const checkTransaction = async () => {
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
					setTransactions(data.Transactions)
					setRole(data.Role.name)
				} else {
					const data = await response.json()
				}
			} catch (error) {
				console.log("- Error Checking Transaction")
			}
		}
		checkTransaction()
	}, [])
	if (!hasMounted) {
		return null
	}

	const deleteTransaction = async (id) => {
		try {
			const token = sessionStorage.getItem("access_token")
			const response = await fetch(baseUrl + `transaction/${id}`, {
				method: "delete",
				headers: {
					Authorization: `Bearer Key ${token}`,
				},
			})
			if (response.ok) {
				const data = await response.json()
				// setTransactions(data.Transactions)
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
						{transactions && transactions.length > 0 ? (
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr className="text-left">
										<th scope="col" className="py-3">
											No.
										</th>
										<th scope="col" className="py-3">
											Title
										</th>
										<th scope="col" className="py-3">
											Administrator
										</th>
										{role === "Admin" && (
											<th scope="col" className="py-3">
												Users
											</th>
										)}
										<th scope="col" className="py-3">
											TransactionDate
										</th>
										{role === "Admin" && (
											<th scope="col" className="py-3">
												Action
											</th>
										)}
									</tr>
								</thead>
								<tbody>
									{transactions &&
										transactions.map((data, index) => {
											return (
												<tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
													<th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
														{index + 1}
													</th>
													<td className="py-4">{data?.title}</td>
													<td className="py-4">{data?.Administrator?.name}</td>
													{role === "Admin" && (
														<td className="py-4">
															<ul className="text-gray-500 list-disc list-inside dark:text-gray-400">
																{data.Users &&
																	data?.Users.map((data, index) => {
																		return <li key={index}>{data.name}</li>
																	})}
															</ul>
														</td>
													)}
													<td>{dateFormat(data.transaction_date)}</td>
													{role === "Admin" && (
														<td className="py-4 flex justify-evenly items-center">
															<Button as={Link} href={`/transaction/update/${data.id}`} size="xs" color="blue">
																Update
															</Button>
															<Button
																size="xs"
																color="failure"
																onClick={(e) => {
																	e.preventDefault()
																	deleteTransaction(data.id)
																}}
															>
																Delete
															</Button>
														</td>
													)}
												</tr>
											)
										})}
								</tbody>
							</table>
						) : (
							<div>There is No Transactions</div>
						)}
					</div>
				</section>
			</div>
		</Card>
	)
}
