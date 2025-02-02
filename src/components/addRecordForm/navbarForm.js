import "../../style/Form/navbar.scss";
import "../../style/fonts.css";
import { ReactComponent as ConfirmSVG } from "../../svg/confirm.svg"
import { ReactComponent as UnfinishedSVG } from "../../svg/edit-square.svg"

function Navbar({ onStepChange, currentStep }) {
    const allSteps = {
        stepOne: 1,
        stepTwo: 2,
        stepThree: 3
    }
    const getStep = (step) => {
        if (currentStep === step) {
            return "navbar-step step-active";
        } else if (currentStep > step) {
            return "navbar-step step-done";
        } else {
            return "navbar-step";
        }
    }
    const getLine = (line) => {
        if (currentStep > line) {
            return "navbar-line line-active";
        } else {
            return "navbar-line";
        }
    }
    return (
        <div className="navbar">
            <div className={getStep(1)} onClick={currentStep > 1 ? () => onStepChange(1) : undefined}>
                <div className="step-number">{currentStep === 1 ? 1 : <ConfirmSVG />}</div>
                <div className="step-title">Upload Cover</div>
            </div>
            <hr className={getLine(1)} />
            <div className={getStep(2)} onClick={currentStep > 2 ? () => onStepChange(2) : undefined}>
                <div className="step-number">{currentStep <= 2 ? 2 : <ConfirmSVG />}</div>
                <div className="step-title">Add Album Info</div>
            </div>
            <hr className={getLine(2)} />
            <div className={getStep(3)} onClick={currentStep > 3 ? () => onStepChange(3) : undefined}>
                <div className="step-number">{currentStep <= 3 ? 3 : <ConfirmSVG />}</div>
                <div className="step-title">Add Songs</div>
            </div>
        </div>
    )
}

export default Navbar;