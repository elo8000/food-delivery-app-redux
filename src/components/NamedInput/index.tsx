export default function NamedInput(props: {
  name: string
  onChange: () => void
  placeholder?: string
}) {
  return (
    <div className="flex flex-col m-4">
      {props.name}
      <input
        onChange={props.onChange}
        placeholder={props.placeholder}
        className="border-2 border-gray-600 rounded-[4px] h-10 mt-2"
      ></input>
    </div>
  )
}
