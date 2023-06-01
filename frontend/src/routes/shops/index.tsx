import ShopNavBar from "../../components/ShopNavBar"
import Products from "../../components/Products"
import { useGetShopItemsByIdQuery, useGetShopsQuery } from "../../api/api"
import { useDispatch, useSelector } from "react-redux"
import {
  selectActiveShopId,
  setActiveShopId,
} from "../../features/cart/cartSlice"
import { useEffect } from "react"
export default function Shops() {
  const { data: shops = [] } = useGetShopsQuery()
  const dispatch = useDispatch()
  useEffect(() => {
    if (shops?.length > 0 && !activeShopId)
      dispatch(setActiveShopId(shops[0].id))
  }, [shops]) // auto select first available shop if none selected
  const activeShopId = useSelector(selectActiveShopId)
  const { data: items = [] } = useGetShopItemsByIdQuery(activeShopId, {
    skip: shops.length === 0 || !activeShopId,
  })
  return (
    <div className="flex w-full p-4 gap-4 min-h-0">
      <ShopNavBar shops={shops} />
      <Products products={items} />
    </div>
  )
}
