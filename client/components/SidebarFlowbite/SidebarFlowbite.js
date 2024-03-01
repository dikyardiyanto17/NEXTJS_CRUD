"use client"

import { Sidebar } from "flowbite-react"
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi"
import { GrTransaction } from "react-icons/gr"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SidebarFlowbite({ setUser, role }) {
	const [hasMounted, setHasMounted] = useState(false)
	const [currentPath, setCurrentPath] = useState("")

	useEffect(() => {
		const currentUrl = typeof window !== "undefined" ? window.location.pathname : "Error"
		setCurrentPath(currentUrl)
		setHasMounted(true)
	}, [])
	if (!hasMounted) {
		return null
	}

	return (
		<Sidebar aria-label="Sidebar with multi-level dropdown example" className="h-screen w-3/12">
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item as={Link} href="/" icon={HiChartPie}>
						Dashboard
					</Sidebar.Item>
					<Sidebar.Collapse icon={GrTransaction} label="Transactions">
						<Sidebar.Item as={Link} href="/transaction">
							Transactions
						</Sidebar.Item>
						{role === "Admin" && (
							<Sidebar.Item as={Link} href="/transaction/add">
								Add Transaction
							</Sidebar.Item>
						)}
					</Sidebar.Collapse>
					{role === "Admin" && (
						<Sidebar.Collapse icon={HiUser} label="User">
							<Sidebar.Item as={Link} href="/user">
								Users
							</Sidebar.Item>
							<Sidebar.Item href="/user/add" as={Link}>
								Add User
							</Sidebar.Item>
						</Sidebar.Collapse>
					)}
					<Sidebar.Item
						as={Link}
						href="/"
						className="cursor-pointer"
						icon={HiArrowSmRight}
						onClick={() => {
							sessionStorage.removeItem("access_token")
							setUser(false)
						}}
					>
						Log Out
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	)
}
