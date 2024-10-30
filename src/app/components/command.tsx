"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "lucide-react"
import { useRouter } from "next/navigation"

const projectid = [
  {
    value: "tenkdao.near",
    label: "tenkdao.near",
  },
  {
    value: "potlock.near",
    label: "potlock.near",
  },
  {
    value: "proofofvibes.near",
    label: "proofofvibes.near",
  },
  {
    value: "shitzu.sputnik-dao.near",
    label: "shitzu.sputnik-dao.near",
  },
  {
    value: "orahacks.near",
    label: "orahacks.near",
  },
  {
    value: "sharddog.near",
    label: "sharddog.near",
  },
  {
    value: "magicbuild.near",
    label: "magicbuild.near",
  },
  {
    value: "nearfunds.near",
    label: "nearfunds.near",
  },
  {
    value: "nearhealth.near",
    label: "nearhealth.near",
  },
  {
    value: "joydragon.near",
    label: "joydragon.near",
  },
  {
    value: "joyagekingdom.near",
    label: "joyagekingdom.near",
  },
  {
    value: "agwaze.near",
    label: "agwaze.near",
  },
  {
    value: "yearofchef.near",
    label: "yearofchef.near",
  },
  {
    value: "aifunding.near",
    label: "aifunding.near",
  },
  {
    value: "nearchan.near",
    label: "nearchan.near",
  },
  {
    value: "buildcity.near",
    label: "buildcity.near",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[500px] justify-between"
        >
          {value
            ? projectid.find((projId) => projId.value === value)?.label
            : "Find your project by near account id"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Find your project by near account id (i.e. tenkdao.near)" className="h-9" />
          <CommandList>
            <CommandEmpty>No Project found.</CommandEmpty>
            <CommandGroup>
              {projectid.map((projId) => (
                <CommandItem
                  key={projId.value}
                  value={projId.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    if (currentValue) {
                        router.push(`/?value=${currentValue}`)
                      }
                  }}
                >
                  {projId.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === projId.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
