import {Link} from "react-router-dom";

const Footer = ()=>{
    return(
    <footer>
        <div className="bg-gray-900 text-white py-6 mt-24 text-center">
            <p>
                &copy;{new Date().getFullYear()}          SpinningSpinning Dolimpan. All right reserved.
            </p>
            <div className={"flex justify-center space-x-4 mt-4"}>
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Terms of Service</Link>
                <Link to={"#"}>Contact</Link>
            </div>
        </div>
    </footer>
    )
}
export default Footer;