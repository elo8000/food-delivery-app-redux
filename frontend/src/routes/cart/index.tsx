import { useDispatch, useSelector } from "react-redux"
import NamedInput from "../../components/NamedInput"
import {
  emptyCart,
  retrieveStateFromLocalStoreage,
  selectCart,
  selectCartHasItems,
  selectTotalCartPrice,
} from "../../features/cart/cartSlice"
import CartItems from "../../components/CartItems"
import { useGetShopItemsByIdQuery, useGetShopsQuery } from "../../api/api"
import { selectActiveShopId } from "../../features/cart/cartSlice"
import { useEffect, useMemo, useState } from "react"
import { useCheckoutMutation } from "../../api/api"
import GoogleMap from "../../components/GoogleMap"
import {
  useGetAddressByGeolocationQuery,
  useGetRouteQuery,
} from "../../api/googleApi"
import { Coordinates } from "../../utils/utilTypes"
import {
  selectUser,
  setAddress,
  setEmail,
  setName,
  setPhone,
} from "../../features/user/userSlice"
import { skipToken } from "@reduxjs/toolkit/dist/query"
export default function Cart() {
  const [activeShop, setActiveShop] = useState<{
    id: number
    name: string
    lat: number
    lng: number
  } | null>(null)
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
  const dispatch = useDispatch()
  const [checkout] = useCheckoutMutation()
  useEffect(() => {
    dispatch(retrieveStateFromLocalStoreage())
  }, [])
  const [lastClickGelocation, setLastClickGelocation] =
    useState<Coordinates | null>(null)
  const address = useGetAddressByGeolocationQuery(lastClickGelocation!, {
    skip: !lastClickGelocation,
  })
  const route = useGetRouteQuery(
    activeShop && activeShop.lat && activeShop.lng && lastClickGelocation
      ? {
          origin: lastClickGelocation!,
          destination: {
            lat: activeShop.lat,
            lng: activeShop.lng,
          },
        }
      : skipToken,
  )
  useEffect(() => {
    if (address.isSuccess && address.data.status === "OK") {
      dispatch(setAddress(address.data.results[0].formatted_address))
    }
  }, [address])
  const shops = useGetShopsQuery()
  useEffect(() => {
    const tmp = shops.data?.find((shop) => {
      return shop.id === activeShopId
    })
    if (tmp) {
      setActiveShop({
        id: tmp.id,
        lat: Number(tmp.lat), //TODO find out why rtk query returns string
        lng: Number(tmp.lng),
        name: tmp.name,
      })
    }
  }, [shops, activeShopId])
  const cartHasItems = useSelector(selectCartHasItems)
  const currentUser = useSelector(selectUser)
  return (
    <div className="flex flex-col p-4 flex-grow">
      <div className="flex flex-grow gap-4">
        <div className="flex flex-col w-full border-2 border-gray-600 rounded-md">
          {activeShop && (
            <div>
              <GoogleMap
                onClick={(lat: number, lng: number) => {
                  setLastClickGelocation({ lat, lng })
                }}
                markerLocations={[
                  {
                    position: {
                      lat: activeShop.lat,
                      lng: activeShop.lng,
                    },
                    title: activeShop.name,
                  },
                ]}
              />
              {route.data && (
                <p className="mx-4">
                  Distance to the shop:{" "}
                  {route.data.routes[0].distanceMeters || 0} meters. Estimated
                  travel time:{" "}
                  {Math.ceil(
                    Number(route.data.routes[0].duration.slice(0, -1)) / 60,
                  )}{" "}
                  minutes.
                </p>
              )}
            </div>
          )}
          <NamedInput
            name="Name"
            value={currentUser.name}
            setInput={(e) => {
              dispatch(setName(e))
            }}
          />
          <NamedInput
            name="Email"
            value={currentUser.email}
            setInput={(e) => {
              dispatch(setEmail(e))
            }}
          />
          <NamedInput
            name="Phone"
            value={currentUser.phone}
            setInput={(e) => {
              dispatch(setPhone(e))
            }}
          />
          <NamedInput
            name="Address"
            value={currentUser.address}
            setInput={(e) => {
              dispatch(setAddress(e))
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
              if (
                cartHasItems &&
                currentUser.address &&
                currentUser.email &&
                currentUser.name &&
                currentUser.phone
              ) {
                const resutl = await checkout({
                  cart: cart,
                  user: currentUser,
                }).unwrap()
                dispatch(emptyCart())
              }
            } catch (e) {
              throw Error("Failed to checkout")
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
