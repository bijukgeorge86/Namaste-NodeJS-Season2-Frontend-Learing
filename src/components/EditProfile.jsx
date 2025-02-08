import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useFormState } from "react-dom";

const EditProfile = ({ user }) => {
    //console.log(user);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    //const [skills, setSkills] = useState(user.setSkills);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const saveProfileDetails = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit/",
                { firstName, lastName, photoUrl, age, gender, about },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <>
            <div className="flex justify-center my-10 ">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold mb-6 justify-center">
                                Edit Profile
                            </h2>
                            <div>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">
                                            First Name
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please enter your first name"
                                        value={firstName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Last Name
                                        </span>
                                    </div>
                                    <input
                                        type="test"
                                        placeholder="Please enter yourlast name"
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please enter your age"
                                        value={age}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Gender
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please enter your gender"
                                        value={gender}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">
                                            Gender
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please upload tour profile picture"
                                        value={photoUrl}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) =>
                                            setPhotoUrl(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">
                                            About
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Please enter your About"
                                        value={about}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) =>
                                            setAbout(e.target.value)
                                        }
                                    />
                                </label>
                                {/*<label className="form-control w-full max-w-xs my-2">
                                <div className="label">
                                    <span className="label-text">Skills</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Please enter your skills"
                                    value={skills}
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </label> */}
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center mt-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={saveProfileDetails}
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard
                    user={{ firstName, lastName, photoUrl, age, gender, about }}
                />
            </div>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
