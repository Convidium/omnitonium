import "../../style/Form/navigationButtons.scss";
import { ReactComponent as ArrowSVG } from "../../svg/arrow.svg"
import { ReactComponent as LeaveSVG } from "../../svg/leave.svg"
import { ReactComponent as ConfirmSVG } from "../../svg/confirm.svg"
import { useEffect, useState } from "react";

function LeftButton({ currentStep }) {
    return currentStep === 1 ? (
        <>
            <LeaveSVG />
            <span>Leave</span>
        </>
    ) : (
        <>
            <ArrowSVG />
            <span>Back</span>
        </>
    );
}

function RightButton({ currentStep }) {
    return currentStep === 3 ? (
        <>
            <span>Confirm</span>
            <ConfirmSVG />
        </>
    ) : (
        <>
            <span>Next</span>
            <ArrowSVG />
        </>
    );
}

function NavigationButtons({ onStepChange, currentStep }) {
    const [leftBtnClass, setLeftBtnClass] = useState("nav-btn nav-back");
    const [rightBtnClass, setRightBtnClass] = useState("nav-btn nav-next");

    useEffect(() => {
        setLeftBtnClass(currentStep === 1 ? "nav-btn nav-leave" : "nav-btn nav-back");
        setRightBtnClass(currentStep === 3 ? "nav-btn nav-confirm" : "nav-btn nav-next");
    }, [currentStep]);

    return (
        <div className="form-btn-block">
            <button className={leftBtnClass} onClick={() => onStepChange(currentStep - 1)}>
                <LeftButton currentStep={currentStep} />
            </button>
            <button className={rightBtnClass} onClick={() => onStepChange(currentStep + 1)}>
                <RightButton currentStep={currentStep} />
            </button>
        </div>
    );
}

export default NavigationButtons;