import { Container } from "react-bootstrap"
import Navigation from "./navigation.layout";

const MainLayouts = ({ children }) => {
    return (
        <Container>
            <Navigation/>
            {children}
        </Container>
    )
}

export default MainLayouts