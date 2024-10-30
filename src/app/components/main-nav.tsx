"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>

      <p className=" text-xs text-gray-500 justify-end">WIP Demo: only few projects available at the moment; data updated daily</p>
    </nav>
  )
}
