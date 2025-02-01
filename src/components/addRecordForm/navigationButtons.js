import "../../style/Form/navigationButtons.scss";
import { ReactComponent as ArrowSVG } from "../../svg/arrow.svg"
import { ReactComponent as LeaveSVG } from "../../svg/leave.svg"
import { ReactComponent as ConfirmSVG } from "../../svg/confirm.svg"
import { useEffect, useState } from "react";

function NavigationButtons({ onStepChange, currentStep }) {
    const [leftBtnClass, setLeftBtnClass] = useState("nav-btn nav-back");
    const [rightBtnClass, setRightBtnClass] = useState("nav-btn nav-next");
    
    const LeftButton = () => {
        switch (currentStep) {
            case 1:
                setLeftBtnClass("nav-btn nav-leave");
                return (
                    <>
                        <LeaveSVG />
                        <span>Leave</span>
                    </>
                )
            default:
                setLeftBtnClass("nav-btn nav-back");
                return (
                    <>
                        <ArrowSVG />
                        <span>Back</span>
                    </>
                )
        }
    }
    const RightButton = () => {
        switch (currentStep) {
            case 3:
                setRightBtnClass("nav-btn nav-confirm");
                return (
                    <>
                        <span>Confirm</span>
                        <ConfirmSVG />
                    </>
                )
            default:
                setRightBtnClass("nav-btn nav-next");
                return (
                    <>
                        <span>Next</span>
                        <ArrowSVG />
                    </>
                )
        }
    }

    return (
        <div className='form-btn-block'>
            <button className={leftBtnClass} onClick={() => onStepChange(currentStep - 1)}>
                <LeftButton/>
            </button>
            <button className={rightBtnClass} onClick={() => onStepChange(currentStep + 1)}>
                <RightButton/>
            </button>
        </div>
    )
}

export default NavigationButtons;