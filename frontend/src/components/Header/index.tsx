import { NavLink } from "react-router-dom"
import "./Header.css"
export default function Header(props: {
  pages: { name: string; url: string }[]
}) {
  return (
    <header className="flex h-10 pt-4 items-center">
      {props.pages.map((page) => (
        <div className={`flex h-full items-center separator`} key={page.name}>
          <NavLink to={page.url} className="mx-12">
            {page.name}
          </NavLink>
        </div>
      ))}
    </header>
  )
}
