export default function ShopNavBarItem(props: {
  name: string
  price: number
  count: number
  imageUrl: string
}) {
  return <button>{props.name}</button>
}
