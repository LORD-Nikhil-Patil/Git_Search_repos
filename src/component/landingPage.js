import React from "react";
import { SearchInput } from "../component/search";
import { VscGithubAlt } from "react-icons/vsc";
import { useNavigate } from "react-router-dom"
const Landing = () => {

    const navigate = useNavigate();
    const routeChange = (input) => {
        let path = `/search/${input}`;
        navigate(path)
      };
      
    return (
        <div className="landing-page">
            <div className="d-flex align-items-center justify-content-center flex-column wrapper">
                <div className="landing-page-heading">
                    <VscGithubAlt className="gitLogo" />
                    <span className="">Github Repository Search</span>
                </div>
                <SearchInput onSubmit={routeChange}  />
            </div>
        </div>
    )

}

export default Landing;