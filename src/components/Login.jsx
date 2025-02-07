import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("biju@gmail.com");
    const [password, setPassword] = useState("Jesus@25");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginSubmit = async () => {
        //e.preventDefault();
        //console.log("Email ID => " + emailId);
        //iconsole.log("Password => " + password);
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            //console.log(res.data);
            dispatch(addUser(res?.data));
            return navigate("/");
        } catch (error) {
            setError(error?.response?.data || "Something went Wrong..!!!");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6 justify-center">
                        Login!
                    </h2>
                    <div>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                value={emailId}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center mt-6">
                        <button
                            className="btn btn-primary"
                            onClick={handleLoginSubmit}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
