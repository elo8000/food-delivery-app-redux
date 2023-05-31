import ShopNavBarItem from "../ShopNavBarItem"

export default function ShopNavBar(props: {
  shops: { name: string; id: number }[]
}) {
  return (
    <div className="flex flex-col w-1/5 items-center gap-4 py-4 rounded-md border-gray-600 border-2 min-h-0 overflow-y-auto">
      <p className="font-bold">Shops:</p>
      {props.shops.map((shop, index) => {
        return <ShopNavBarItem name={shop.name} id={shop.id} key={shop.id} />
      })}
    </div>
  )
}
