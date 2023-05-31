import { useSelector } from "react-redux"
import NamedInput from "../../components/NamedInput"
import { selectCart, selectTotalCartPrice } from "../../features/cart/cartSlice"
import CartItems from "../../components/CartItems"
import { useGetShopItemsByIdQuery } from "../../api/api"
import { selectActiveShopId } from "../../features/shop/shopSlice"
export default function Cart(props: {
  items: { name: string; price: number; count: number }[]
}) {
  const cart = useSelector(selectCart)
  const totalPrice = useSelector(selectTotalCartPrice)
  const activeShopId = useSelector(selectActiveShopId)
  const { data: shopItems = [] } = useGetShopItemsByIdQuery(activeShopId)
  console.log(shopItems, cart)
  const cartItems = cart.items.map((cartItem) => {
    const shopItem = shopItems.find((value) => value.id === cartItem.id)
    if (shopItem === undefined) throw "No such shop item!"
    return {
      count: cartItem.count,
      ...shopItem,
    }
  })
  return (
    <div className="flex flex-col p-4 flex-grow">
      <div className="flex flex-grow gap-4">
        <div className="flex flex-col w-full border-2 border-gray-600 rounded-md">
          <NamedInput
            name="Name"
            onChange={() => {
              return
            }}
          />
          <NamedInput
            name="Email"
            onChange={() => {
              return
            }}
          />
          <NamedInput
            name="Phone"
            onChange={() => {
              return
            }}
          />
          <NamedInput
            name="Address"
            onChange={() => {
              return
            }}
          />
        </div>
        <CartItems items={cartItems} />
      </div>
      <div className="flex justify-end mb-4 mt-8">
        <p className="text-2xl mr-20">Total price: {totalPrice}</p>
        <button className="w-40 h-12 border-2 font-bold rounded-xl border-gray-600">
          Submit
        </button>
      </div>
    </div>
  )
}
