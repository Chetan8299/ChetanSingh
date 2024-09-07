import React from "react";

const FABButton = ({ svg, onclick, classes, close }) => {
    return (
        <div
            ref={close !== undefined ? close : null}
            className={classes}
            onClick={onclick}
            style={{ boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.5)" }}
        >
            <img
                src={svg}
                alt=""
            />
        </div>
    );
};

export default FABButton;
