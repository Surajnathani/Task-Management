import { NavLink } from "react-router-dom"

const Error = () => {
    return (
        <div className="container">
            <div className="error">
                <div className="errorHeading">
                    <h1>404</h1>
                    <p>Something  went <strong> wrong!</strong></p>
                </div>
                <NavLink to='/' className='errorButton'>Back to HomePage</NavLink>
            </div>
        </div>
    )
}

export default Error