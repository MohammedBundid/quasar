import { ReactNode } from "react"
import Sidebar from "./Sidebar"

interface MainProps {
    children: ReactNode // Accepts anything renderable in React (e.g., elements, strings, fragments)
}

const Main:React.FC<MainProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-background-950 flex ">
        <Sidebar />
        {children}
    </div>
  )
}

export default Main