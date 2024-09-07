import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoMdAttach } from "react-icons/io";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import FABButton from "./FABButton";
import Card from "./Card";
import Rating from "@mui/material/Rating";
import "./App.css";
import { useDispatch } from "react-redux";
import { clearData } from "./app/reducers/cardSlice";

const App = () => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [fab, setFab] = useState("/FAB.svg");
    const [active, setActive] = useState({});
    const close = useRef(null);
    const [thanksMessage, setThanksMessage] = useState(null);
    const [rate, setRate] = useState(false);
    const [rating, setRating] = useState(0);
    const [ratingMessage, setRatingMessage] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const thanks = [
        "Thanks for bringing the issue to our attention. We'll review it shortly and provide an update soon!",
        "Thanks for your valuable feedback!",
        "Thanks for your valuable Suggestion!",
        "Thanks for reaching out to us! We will get back to you as soon as possible",
    ];

    const buttons1 = [
        {
            name: "Report an Issue",
            icon: "/report.svg",
            onclick: () => {
                setActive({
                    name: "Report an Issue",
                    icon: "/report.svg",
                    number: 1,
                });
                setShow1(false);
                setShow2(true);
            },
        },
        {
            name: "Share Feedback",
            icon: "/feedback.svg",
            onclick: () => {
                setActive({
                    name: "Share Feedback",
                    icon: "/feedback.svg",
                    number: 2,
                });
                setShow1(false);
                setShow2(true);
            },
        },
        {
            name: "Give Suggestion",
            icon: "/suggestion.svg",
            onclick: () => {
                setActive({
                    name: "Give Suggestion",
                    icon: "/suggestion.svg",
                    number: 3,
                });
                setShow1(false);
                setShow2(true);
            },
        },
        {
            name: "Contact Us",
            icon: "/contactus.svg",
            onclick: () => {
                setActive({
                    name: "Contact Us",
                    icon: "/contactus.svg",
                    number: 4,
                });
                setShow1(false);
                setShow2(true);
            },
        },
    ];
    const buttons2 = [
        {
            name: "Report an Issue",
            icon: "/report.svg",
            onclick: () => {
                setActive({
                    name: "Report an Issue",
                    icon: "/report.svg",
                    number: 1,
                });
            },
        },
        {
            name: "Share Feedback",
            icon: "/feedback.svg",
            onclick: () => {
                setActive({
                    name: "Share Feedback",
                    icon: "/feedback.svg",
                    number: 2,
                });
            },
        },
        {
            name: "Give Suggestion",
            icon: "/suggestion.svg",
            onclick: () => {
                setActive({
                    name: "Give Suggestion",
                    icon: "/suggestion.svg",
                    number: 3,
                });
            },
        },
        {
            name: "Contact Us",
            icon: "/contactus.svg",
            onclick: () => {
                setActive({
                    name: "Contact Us",
                    icon: "/contactus.svg",
                    number: 4,
                });
            },
        },
    ];

    const cards = [
        {
            title: "Let us know about the .Issue. you are facing right now!",
            select: [
                "Select",
                "Concept cards",
                "Interview Questions",
                "Practice Questions",
                "Quizzes",
                "Other",
            ],
            writehere: {
                title: "Describe the issue in detail",
                attachment: true,
            },
        },
        {
            title: "Let us know your .Feedback. about us!",
            select: null,
            writehere: {
                title: null,
                attachment: true,
            },
        },
        {
            title: "Share your .Suggestions. with us for a chance to earn rewards!",
            select: [
                "Select",
                "Concept cards",
                "Interview Questions",
                "Practice Questions",
                "Quizzes",
                "Other",
            ],
            writehere: {
                title: "Describe the suggestion in detail",
                attachment: true,
            },
        },
        {
            title: "Get in .Contact with us. for your queries!",
            select: null,
            isLoggedIn: true,
            name: "Your Name",
            writehere: {
                title: "What would you like to ask? ",
                attachment: false,
            },
        },
        {
            title: "Get in .Contact with us. for your queries!",
            isLoggedIn: false,
            select: null,
            writehere: {
                title: "What would you like to ask? ",
                attachment: false,
            },
        },
    ];

    const submitRatingHandler = () => {
        setRatingMessage(true);
    };
    const clearThanks = () => {
        setTimeout(() => {
            setThanksMessage(null);
            setTimeout(() => {
                setRate(true);
            }, 2000);
        }, 5000);
    };
    useEffect(() => {
        if (thanksMessage !== null) {
            clearThanks();
        }
    }, [thanksMessage]);
    useEffect(() => {
        if (show1 || show2) {
            setFab("/FABclose.svg");
        } else {
            setFab("/FAB.svg");
        }
    }, [show1, show2]);

    useEffect(() => {
        if (ratingMessage == true) {
            setTimeout(() => {
                setRatingMessage(false);
                setRate(false);
                setRating(0);
            }, 2000);
        }
    }, [ratingMessage]);
    return (
        <div style={{ position: "relative", height: "100%" }}>
            {(show1 || show2) && window.innerWidth < 768 && (
                <div className="bg-overlay "></div>
            )}
            {rate && (
                <div className="bg-overlay ">
                    <div className="rating-modal">
                        {ratingMessage ? (
                            <h1>
                                Thank you for taking the <br /> time to rate us!
                            </h1>
                        ) : (
                            <>
                                <h1>Rate your experience with us!</h1>
                                <div className="flex items-center gap-2">
                                    <Rating
                                        onChange={(e, newval) => {
                                            setRating(newval);
                                        }}
                                        value={rating}
                                        className="md:scale-150"
                                        name="half-rating"
                                        defaultValue={0}
                                        precision={1}
                                    />
                                </div>
                                {rating !== 0 && (
                                    <button
                                        onClick={submitRatingHandler}
                                        style={{
                                            boxShadow:
                                                "0px 4px 6px 0px #0000000F",
                                        }}
                                    >
                                        Submit
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
            <nav className="navbar">
                <h1>
                    The <span>Product</span> Platform
                </h1>
                <ul>
                    <li>
                        <a href="#">
                            Learn
                            <MdKeyboardArrowDown size={30} />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            Practice
                            <MdKeyboardArrowDown size={30} />
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img
                                className="max-md:scale-75"
                                src="/avatar.png"
                                alt=""
                            />
                        </a>
                    </li>
                </ul>
            </nav>
            <main className="main-section">
                <div
                    style={{ fontSize: "24px", lineHeight: "2rem" }}
                    className="text-sm"
                >
                    Practice Interview <br />
                    Questions <br />
                </div>
                <div className="text-sm">
                    Embark on an Exploration: <br />
                    800 Questions Await!
                </div>
                <div className="text">
                    <FaArrowLeft size={40} /> Back to Questions
                </div>
                <div>
                    {/* Question */}
                    <div className="question-card">
                        <div className="flex-center-between">
                            <div className="tags">
                                <div className="tag">Design</div>
                                <div className="tag">Technology</div>
                            </div>
                            <div className="rocket">
                                <img src="/startup.png" alt="" />
                                Startup
                            </div>
                        </div>
                        <div>
                            <p>
                                A travel startup wants Amazon to pre-install
                                their personal travel agent bot on existing
                                Amazon Echos. What is the value of the
                                partnership to the travel startup?{" "}
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Orci
                                elementum aliquet nec viverra tincidunt ? Amet
                                ullamcorper velit tristique scelerisque donec
                                sed viverra arcu. Amet arcu vitae sit
                                scelerisque ultrices magna cursus se?{" "}
                            </p>
                        </div>
                        <div className="flex-center-between question-footer">
                            <div className="question-info">
                                <IoMdEye size={24} /> 100 Views
                            </div>
                            <div className="question-info">
                                <img src="/info.png" alt="" />
                                How should you word your answer?
                            </div>
                        </div>
                    </div>
                    {/* Answers */}
                    <div className="answers flex-center-between">
                        <h2>Answers (23)</h2>
                        <div className="sort-by">
                            <h3>Sort By:</h3>
                            <div className="custom-select-container">
                                <select class="custom-select" name="" id="">
                                    <option value="">Popular</option>
                                    <option value="">Complexity</option>
                                    <option value="">Industry Type</option>
                                    <option value="">Industry</option>
                                    <option value="">Company Type</option>
                                </select>
                                <span className="custom-arrow">
                                    <MdArrowDropDown size={24} />
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Answers */}
                    <div className="answer ">
                        <div className="answer-wrapper">
                            <div className="avatar ">
                                <img src="/avatar.png" alt="" />
                                <div>
                                    <h1 className="font-bold text-xl">
                                        Neha Bhat{" "}
                                        <span style={{ fontWeight: "500" }}>
                                            (You)
                                        </span>
                                    </h1>
                                    <p
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Jun 27, 2023
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    fontWeight: "500",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2px",
                                }}
                            >
                                {" "}
                                <AiFillEdit size={24} /> Edit
                            </div>
                        </div>
                        <div className="answer-ans">
                            Lorem ipsum dolor sit amet consectetur. Elit et ut
                            at vestibulum enim ornare feugi vitae. Eget proin
                            aliquam blandit eget vitae erat fermentum lacus.
                            Dignissim done mi vel fermentum. Id ultrices risus
                            sit pel sit elit morbi. Mi sed mauris aenean odio
                            egestas ullamcorper. Dignissim in vel fusce id. Sit
                            blandit diam ridiculus ipsum{" "}
                            <span style={{ opacity: "50%" }}>
                                interdum ut velit quam. Bibendum amet mi....
                            </span>{" "}
                            <span className="font-bold">Show more</span>
                        </div>
                        <div className="answer-footer">
                            <div
                                style={{
                                    font: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                                className="font-medium"
                            >
                                <BiLike size={24} /> Like
                            </div>
                            <LiaCommentDotsSolid size={24} />
                            <div
                                style={{ width: "80%", gap: "8px" }}
                                className="flex-center-between"
                            >
                                <input
                                    type="text"
                                    placeholder="Add a comment"
                                />
                                <button>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {thanksMessage !== null && (
                <div
                    style={{ boxShadow: "-2px 4px 30px rgba(0, 0, 0, 0.2)" }}
                    className="thanks-message"
                >
                    {thanks[thanksMessage].split(".")[0]}.
                    <br />
                    {thanks[thanksMessage].split(".")[1]}
                </div>
            )}
            {Object.keys(active).length > 0 && (
                <div>
                    <Card
                        setCardHeight={setCardHeight}
                        isSmallScreen={isSmallScreen}
                        number={active.number}
                        carddata={cards[active.number - 1]}
                        close={close}
                        setThanksMessage={setThanksMessage}
                    />
                    <div
                        className="fade-slide-in-x"
                        style={{
                            position: "fixed",
                            bottom:
                                show2 && isSmallScreen
                                    ? cardHeight + 16 + "px"
                                    : "32px",
                            right: isSmallScreen ? "94px" : "115px",
                            zIndex: "2",
                        }}
                    >
                        <ul className="horizontal-menu">
                            {buttons2.map((button, index) => {
                                return active.name === button.name ? (
                                    <div
                                        key={button.icon}
                                        className="active-btn"
                                    >
                                        <li
                                            style={{
                                                display: "flex",
                                                gap: "8px",
                                                alignItems: "center",
                                                justifyContent: "end",
                                            }}
                                        >
                                            <FABButton
                                                svg={button.icon}
                                                onclick={button.onclick}
                                                classes={`horizontal-round-btn`}
                                            />
                                        </li>
                                    </div>
                                ) : (
                                    <li
                                        style={{
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center",
                                            justifyContent: "end",
                                        }}
                                        key={button.icon}
                                    >
                                        <FABButton
                                            svg={button.icon}
                                            onclick={button.onclick}
                                            classes={`horizontal-round-btn  ${
                                                isSmallScreen
                                                    ? "small-screen-fab-button"
                                                    : ""
                                            }`}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {show1 && (
                <div
                    className="fade-slide-in"
                    style={{
                        position: "fixed",
                        bottom: "115px",
                        right: "32px",
                        zIndex: "2",
                    }}
                >
                    <ul
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                        }}
                    >
                        {buttons1.map((button, index) => {
                            return (
                                <li
                                    className="fade-slide-in"
                                    style={{
                                        display: "flex",
                                        gap: "8px",
                                        alignItems: "center",
                                        justifyContent: "end",
                                    }}
                                    key={button.name}
                                >
                                    <button className="fab-btn">
                                        {button.name}
                                    </button>{" "}
                                    <FABButton
                                        svg={button.icon}
                                        onclick={button.onclick}
                                        classes={`fab-button ${
                                            isSmallScreen
                                                ? "small-screen-fab-button"
                                                : ""
                                        }`}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <div
                style={{
                    bottom:
                        show2 && isSmallScreen
                            ? cardHeight + 20 + "px"
                            : "32px",
                }}
                className="fab-container"
            >
                <FABButton
                    svg={fab}
                    close={close}
                    onclick={() => {
                        if (show1 == false && show2 == false) {
                            setShow1((prev) => !prev);
                        } else if (show1 == true && show2 == false) {
                            setShow1((prev) => !prev);
                        } else if (show1 == false && show2 == true) {
                            setShow2((prev) => !prev);
                        }
                        dispatch(clearData());
                        setActive({});
                    }}
                    classes={`fab-button ${show1 || show2 ? "active" : ""} ${
                        isSmallScreen ? "small-screen-fab-button" : ""
                    }`}
                />
            </div>
        </div>
    );
};

export default App;
