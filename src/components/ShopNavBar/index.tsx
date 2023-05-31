import { useState } from "react"
import ShopNavBarItem from "../ShopNavBarItem"

export default function ShopNavBar(props: {
  shops: { name: string; id: number }[]
}) {
  const [activeShop, setActiveShop] = useState(0)
  return (
    <div className="flex flex-col w-1/5 items-center gap-4 py-4 rounded-md border-gray-600 border-2 min-h-0 overflow-y-auto">
      <p className="font-bold">Shops:</p>
      {props.shops.map((shop, index) => {
        return (
          <ShopNavBarItem
            name={shop.name}
            active={index === activeShop}
            setActive={() => setActiveShop(index)}
            key={shop.id}
          />
        )
      })}
    </div>
  )
}
