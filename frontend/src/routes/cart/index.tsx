import { useDispatch, useSelector } from "react-redux"
import NamedInput from "../../components/NamedInput"
import {
  emptyCart,
  retrieveStateFromLocalStoreage,
  selectCart,
  selectTotalCartPrice,
} from "../../features/cart/cartSlice"
import CartItems from "../../components/CartItems"
import { useGetShopItemsByIdQuery } from "../../api/api"
import { selectActiveShopId } from "../../features/cart/cartSlice"
import { useEffect, useMemo, useState } from "react"
import { useCheckoutMutation } from "../../api/api"
import GoogleMap from "../../components/GoogleMap"
import { useGetAddressByGeolocationQuery } from "../../api/googleMapsApi"
export default function Cart() {
  const cart = useSelector(selectCart)
  const totalPrice = useSelector(selectTotalCartPrice)
  const activeShopId = useSelector(selectActiveShopId)
  const { data: shopItems = [] } = useGetShopItemsByIdQuery(activeShopId, {
    skip: activeShopId === 0 || cart.items.length === 0,
  })
  const cartItems = useMemo(() => {
    if (shopItems.length === 0) return []
    return cart.items.map((cartItem) => {
      const shopItem = shopItems.find((value) => value.id === cartItem.id)
      if (shopItem === undefined) throw "No such item"
      return {
        count: cartItem.count,
        ...shopItem,
      }
    })
  }, [cart, shopItems])
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const dispatch = useDispatch()
  const [checkout] = useCheckoutMutation()

  useEffect(() => {
    dispatch(retrieveStateFromLocalStoreage())
  }, [])

  const [lastClickGelocation, setLastClickGelocation] = useState({
    lat: 100,
    lng: 100,
  })
  const address = useGetAddressByGeolocationQuery(lastClickGelocation, {
    skip: lastClickGelocation.lat > 95,
  })
  useEffect(() => {
    console.log(address.data)
    if (address.isSuccess && address.data.status === "OK") {
      setUserAddress(address.data.results[0].formatted_address)
    }
  }, [address])

  return (
    <div className="flex flex-col p-4 flex-grow">
      <div className="flex flex-grow gap-4">
        <div className="flex flex-col w-full border-2 border-gray-600 rounded-md">
          <GoogleMap
            onClick={(lat: number, lng: number) =>
              setLastClickGelocation({ lat, lng })
            }
          />
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
