"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import SidebarFlowbite from "@/components/SidebarFlowbite/SidebarFlowbite"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoginComponent from "@/components/Login/Login"
import { baseUrl } from "./globalVariabel"

const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
// 	title: "Administrator",
// 	description: "Administrator Home Page",
// }

export default function RootLayout({ children }) {
	const router = useRouter()
	const [user, setUser] = useState(false)
	const [role, setRole] = useState("")

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (!sessionStorage.getItem("access_token")) {
					setUser(false)
				} else if (sessionStorage.getItem("access_token")) {
					const token = sessionStorage.getItem("access_token")
					const response = await fetch(`${baseUrl}token/verify`, {
						method: "get",
						headers: {
							Authorization: `Bearer Key ${token}`,
						},
					})
					if (response.ok) {
						const { message, role } = await response.json()
						setUser(true)
						setRole(role)
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
		checkAuth()
	}, [])

	if (!user)
		return (
			<html lang="en">
				<head>
					<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
					<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
				</head>
				<body className={inter.className} suppressHydrationWarning={true}>
					<div className={"flex justify-center items-center w-screen h-screen"}>
						<div className={`flex "w-full items-center" justify-center p-5 overflow-y-auto flex-wrap`}>
							<LoginComponent setUser={setUser} setRole={setRole} />
						</div>
					</div>
				</body>
			</html>
		)

	return (
		<html lang="en">
			<head>
				<link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
				<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
			</head>
			<body className={inter.className} suppressHydrationWarning={true}>
				<div className={"flex h-screen w-screen"}>
					<SidebarFlowbite setUser={setUser} role={role} />
					<div className={`flex w-9/12 justify-center p-5 h-screen overflow-y-auto flex-wrap`}>{children}</div>
				</div>
			</body>
		</html>
	)
}
