import "../../style/Form/navbar.scss";
import "../../style/fonts.css";
import { ReactComponent as ConfirmSVG } from "../../svg/confirm.svg"
import { ReactComponent as UnfinishedSVG } from "../../svg/edit-square.svg"

function Navbar({ currentStep }) {
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
            <div className={getStep(1)}>
                <div className="step-number">{currentStep === 1 ? 1 : <ConfirmSVG />}</div>
                <div className="step-title">Upload Cover</div>
            </div>
            <hr className={getLine(1)} />
            <div className={getStep(2)}>
                <div className="step-number">{currentStep <= 2 ? 2 : <ConfirmSVG />}</div>
                <div className="step-title">Add Album Info</div>
            </div>
            <hr className={getLine(2)} />
            <div className={getStep(3)}>
                <div className="step-number">{currentStep <= 3 ? 3 : <ConfirmSVG />}</div>
                <div className="step-title">Add Songs</div>
            </div>
        </div>
    )
}

export default Navbar;