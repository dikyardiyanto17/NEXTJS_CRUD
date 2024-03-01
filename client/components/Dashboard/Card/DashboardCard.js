"use client"

import { Card } from "flowbite-react"

export default function DashboardCard({ title, total }) {
	return (
		<Card className="w-1/2 m-2" theme={{ root: { children: "p-5 m-0 w-full text-center" } }}>
			<h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400" style={{ borderBottom: "1px solid" }}>
				{title}
			</h5>
			<div className="items-baseline text-gray-900 dark:text-white">
				<span className="text-5xl font-extrabold tracking-tight">{total}</span>
			</div>
		</Card>
	)
}
