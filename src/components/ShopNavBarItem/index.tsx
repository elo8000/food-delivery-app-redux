import styles from "./styles.module.css"
export default function ShopNavBarItem(props: {
  name: string
  active?: boolean
  setActive: () => void
}) {
  const activeStyle = props.active ? styles.active : ""
  return (
    <button
      className={`${activeStyle} w-1/2 p-4 rounded-md border-gray-600 border-2`}
      onClick={props.setActive}
    >
      {props.name}
    </button>
  )
}
