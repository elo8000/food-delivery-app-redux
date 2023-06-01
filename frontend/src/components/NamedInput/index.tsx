export default function NamedInput(props: {
  name: string
  value: string
  setInput: (e: string) => void
  placeholder?: string
}) {
  return (
    <div className="flex flex-col mx-4 my-2">
      {props.name}
      <input
        onChange={(e) => props.setInput(e.target.value)}
        value={props.value}
        placeholder={props.placeholder}
        className="border-2 border-gray-600 rounded-[4px] h-10 mt-2"
      ></input>
    </div>
  )
}
