import { useDispatch, useSelector } from "react-redux"
import NamedInput from "../../components/NamedInput"
import {
  emptyCart,
  selectCart,
  selectTotalCartPrice,
} from "../../features/cart/cartSlice"
import CartItems from "../../components/CartItems"
import { useGetShopItemsByIdQuery } from "../../api/api"
import { selectActiveShopId } from "../../features/shop/shopSlice"
import { useState } from "react"
import { useCheckoutMutation } from "../../api/api"
export default function Cart() {
  const cart = useSelector(selectCart)
  const totalPrice = useSelector(selectTotalCartPrice)
  const activeShopId = useSelector(selectActiveShopId)
  const { data: shopItems = [] } = useGetShopItemsByIdQuery(activeShopId)
  const cartItems = cart.items.map((cartItem) => {
    const shopItem = shopItems.find((value) => value.id === cartItem.id)
    if (shopItem === undefined) throw "No such shop item!"
    return {
      count: cartItem.count,
      ...shopItem,
    }
  })
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const dispatch = useDispatch()
  const [checkout] = useCheckoutMutation()
  return (
    <div className="flex flex-col p-4 flex-grow">
      <div className="flex flex-grow gap-4">
        <div className="flex flex-col w-full border-2 border-gray-600 rounded-md">
          <NamedInput
            name="Name"
            value={userName}
            setInput={(e) => {
              setUserName(e)
            }}
          />
          <NamedInput
            name="Email"
            value={userEmail}
            setInput={(e) => {
              setUserEmail(e)
            }}
          />
          <NamedInput
            name="Phone"
            value={userPhone}
            setInput={(e) => {
              setUserPhone(e)
            }}
          />
          <NamedInput
            name="Address"
            value={userAddress}
            setInput={(e) => {
              setUserAddress(e)
            }}
          />
        </div>
        <CartItems items={cartItems} />
      </div>
      <div className="flex justify-end mb-4 mt-8">
        <p className="text-2xl mr-20">Total price: {totalPrice}</p>
        <button
          className="w-40 h-12 border-2 font-bold rounded-xl border-gray-600"
          onClick={async () => {
            try {
              const resutl = await checkout(cart).unwrap()
              dispatch(emptyCart())
            } catch (e) {
              throw "Failed to checkout"
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
