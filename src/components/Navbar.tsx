import { Navbar as NavbarBs,Nav, Container, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from "../context/ShoppingContext";

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav>
                    <Nav.Link to={"/"} as={NavLink} >
                        Home
                    </Nav.Link>
                    <Nav.Link to={"/store"} as={NavLink} >
                        Store
                    </Nav.Link>
                    <Nav.Link to={"/about"} as={NavLink} >
                        About
                    </Nav.Link>
                </Nav>
                { cartQuantity > 0 && 
                    (<button onClick={openCart} style={{position:"relative"}} className="btn btn-outline-primary ">
                        <ShoppingCartIcon/>
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" 
                        style={{
                            color:"white", 
                            height:"1.5rem",
                            width:"1.5rem", 
                            position:"absolute",
                            left:"32px",
                            top:"23px"
                        }}>{cartQuantity}</div>
                    </button>)
                }

            </Container>
        </NavbarBs>
    )
}