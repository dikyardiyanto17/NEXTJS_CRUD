"use client"
import DashboardCard from "@/components/Dashboard/Card/DashboardCard"
import { baseUrl } from "@/app/globalVariabel"
import { useEffect, useState } from "react"
import { Card } from "flowbite-react"

export default function Home() {
	const [totalTransactions, setTotalTransactions] = useState(0)
	const [totalUsers, setTotalUsers] = useState(0)
	const [role, setRole] = useState("")
	useEffect(() => {
		const checkData = async () => {
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
					setRole(data?.Role?.name)
					setTotalTransactions(data?.Transactions?.length)
					setTotalUsers(data?.Users?.length)
				} else {
					const data = await response.json()
				}
			} catch (error) {
				console.log("- Error Checking Transaction : ", error)
			}
		}
		checkData()
	}, [])
	return (
		<Card className="w-screen" theme={{ root: { children: "h-full text-center p-4" } }}>
			<h1 className="text-5xl font-extrabold dark:text-white">Dashboard</h1>
			<div className="flex w-full  justify-center">
				{role === "Admin" && <DashboardCard title={"User"} total={totalUsers} />}
				<DashboardCard title={"Transaction"} total={totalTransactions} />
			</div>
		</Card>
	)
}
