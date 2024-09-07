import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import {
    setIssue,
    setContact,
    setFeedback,
    setSuggestion,
} from "./app/reducers/cardSlice";

const Card = ({
    number,
    carddata,
    close,
    setThanksMessage,
    isSmallScreen,
    setCardHeight,
}) => {
    const { title, select, writehere } = carddata;
    const { cardData } = useSelector((state) => state);
    console.log(cardData);
    const file = useRef(null);
    const tick = useRef(null);
    const card = useRef(null);
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [writehereText, setWritehereText] = useState("");
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [check, setCheck] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [option, setOption] = useState("Select");
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        console.log("change");
        if (number == 1) {
            setOption(cardData[0].select);
            setWritehereText(cardData[0].writeHere);
        } else if (number == 2) {
            setWritehereText(cardData[1].writeHere);
            setCheck(cardData[1].check);
        } else if (number == 3) {
            setOption(cardData[2].select);
            setWritehereText(cardData[2].writeHere);
        } else if (number == 4) {
            setName(cardData[3].name);
            setEmail(cardData[3].email);
            setPhone(cardData[3].phone);
            setWritehereText(cardData[3].writeHere);
        }
    }, [number]);

    useEffect(() => {
        setCardHeight(document.querySelector(".card-container").clientHeight);
    }, [carddata]);
    const options = carddata.select;

    const checkHandler = () => {
        tick.current.click();
    };

    const handleOptionClick = (item) => {
        setOption(item);
        setIsOpen(false);
    };

    const handleSubmitEnable = () => {
        if ((number == 1 || number == 3) && option && writehereText !== "") {
            setEnableSubmit(true);
        } else if (number == 2 && writehereText !== "") {
            setEnableSubmit(true);
        } else if (
            number == 4 &&
            carddata.isLoggedIn !== true &&
            name !== "" &&
            email !== "" &&
            phone !== ""
        ) {
            setEnableSubmit(true);
        } else if (number == 4 && carddata.isLoggedIn == true && name !== "") {
            setEnableSubmit(true);
        } else {
            setEnableSubmit(false);
        }
    };
    const handleSubmit = () => {
        if (number == 1) {
            setThanksMessage(0);
        } else if (number == 2) {
            setThanksMessage(1);
        } else if (number == 3) {
            setThanksMessage(2);
        } else if (number == 4) {
            setThanksMessage(3);
        }
        close.current.click();
    };

    useEffect(() => {
        if (number == 1) {
            dispatch(setIssue({ select: option, writeHere: writehereText }));
        } else if (number == 2) {
            dispatch(setFeedback({ writeHere: writehereText, check: check }));
        } else if (number == 3) {
            dispatch(
                setSuggestion({ select: option, writeHere: writehereText })
            );
        } else if (number == 4) {
            if (carddata.isLoggedIn == false) {
                dispatch(
                    setContact({
                        name: name,
                        email: email,
                        phone: phone,
                        writeHere: writehereText,
                    })
                );
            } else {
                dispatch(
                    setContact({
                        name: name,
                        email: "",
                        phone: "",
                        writeHere: writehereText,
                    })
                );
            }
        }
    }, [option, writehereText, name, email, phone]);

    useEffect(() => {
        handleSubmitEnable();
    }, [option, writehereText, name, email, phone]);

    const handleAttach = () => {
        if (files.length < 2) {
            file.current.disabled = false;
            file.current.click();
        } else {
            file.current.disabled = true;
        }
    };

    const attachHandler = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + files.length > 2) {
            alert("You can only upload a maximum of 2 files.");
            return;
        }

        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);

        const newPreviews = selectedFiles.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);

        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
    };

    return (
        <div
            ref={card}
            className={`card-container card-in ${
                isSmallScreen ? "" : "fade-slide-in"
            }`}
        >
            <h1 className="card-title">
                {title.split(".")[0]}
                <span>{title.split(".")[1]}</span>
                {title.split(".")[2]}
            </h1>
            <div className="divider"></div>
            {select && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                >
                    <h2 className="section-label">Choose a section</h2>
                    <div style={{ position: "relative", width: "100%" }}>
                        {/* Dropdown button */}
                        <div
                            onClick={toggleDropdown}
                            style={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.24)",
                            }}
                            className="dropdown-button"
                        >
                            {option}
                            <svg
                                className={`w-5 h-5 text-[#333333] transition-transform transform ${
                                    isOpen ? "rotate-180" : "rotate-0"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>

                        {/* Dropdown options */}
                        {isOpen && (
                            <ul className="dropdown-list">
                                {options.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleOptionClick(item)}
                                        className="dropdown-item"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
            {number == 4 && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h2 className="input-label">
                        Your Name <span style={{ color: "#FD443A" }}>*</span>
                    </h2>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Name"
                        type="text"
                        className="text-input"
                    />
                    {carddata?.isLoggedIn && carddata.isLoggedIn == false && (
                        <>
                            <h2
                                style={{ marginBottom: "8px" }}
                                className="input-label"
                            >
                                Your Email
                            </h2>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                type="text"
                                style={{ marginBottom: "8px" }}
                                className="text-input"
                            />
                            <h2 className="input-label">
                                Your Mobile Number{" "}
                                <span style={{ color: "#FD443A" }}>*</span>
                            </h2>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your number"
                                type="text"
                                className="text-input"
                            />
                        </>
                    )}
                </div>
            )}

            {writehere && (
                <div className="write-here">
                    {writehere.title && (
                        <h2>
                            {writehere.title}{" "}
                            <span style={{ color: "#FD443A" }}>*</span>
                        </h2>
                    )}

                    <div className="textarea-container">
                        <div className="w-full ">
                            <textarea
                                value={writehereText}
                                onChange={(e) =>
                                    setWritehereText(e.target.value)
                                }
                                placeholder="Write here..."
                                cols="30"
                                rows="10"
                                className="textarea"
                            ></textarea>

                            <input
                                onChange={attachHandler}
                                ref={file}
                                type="file"
                                multiple
                            />
                        </div>
                        <div className="txt-container">
                            {writehere.attachment && (
                                <button
                                    onClick={handleAttach}
                                    className="attachment-button"
                                >
                                    <img
                                        style={{
                                            opacity:
                                                files.length == 2 ? "0.5" : "1",
                                            scale: ".75",
                                        }}
                                        src="/Attach.svg"
                                        alt=""
                                    />
                                    Attach
                                </button>
                            )}

                            {/* File previews */}
                            {previews.length > 0 && writehere.attachment && (
                                <div className="file-preview-container">
                                    {previews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index}`}
                                                className="file-preview"
                                            />
                                            <button
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className="remove-file-button"
                                            >
                                                <img
                                                    src="/attachclose.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {number == 2 && (
                <div className="checkbox-container">
                    <input
                        checked={check}
                        ref={tick}
                        type="checkbox"
                        onChange={(e) => setCheck(e.target.checked)}
                    />
                    <div onClick={checkHandler} className="checkbox">
                        {check ? <img src="/tick.svg" alt="" /> : null}
                    </div>
                    Send feedback anonymously
                </div>
            )}
            <button
                onClick={handleSubmit}
                style={{
                    boxShadow: "0px 4px 6px 0px #0000000F",
                    opacity: enableSubmit ? "1" : "0.5",
                }}
                className="submit-button"
            >
                Submit
            </button>
        </div>
    );
};

export default Card;
