import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="find your project by near account id (i.e. tenkdao.near)"
        className="md:w-[100px] lg:w-[600px]"
      />
    </div>
  )
}
