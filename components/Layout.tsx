import { Footer } from "./Footer"
import { Header } from "./Header"
import Meta from "./Meta"

export const Layout:React.FC = ({children}) => {
    return(
        <div className="wrapper">
            <Header/>
        <Meta/>
        {children}
        </div>
    )
}