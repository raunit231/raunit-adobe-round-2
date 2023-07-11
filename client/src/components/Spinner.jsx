import React from "react";
import { ReactComponent as LoadingSpinner } from "../assets/Infinity-1s-200px.svg";
// loading screen
function Spinner() {
	return (
		<div className="w-screen absolute -bottom-14 -top-10 right-0 left-0 flex flex-col justify-center overflow-hidden items-center z-50 bg-[#ffffff4b] pointer-events-none">
			<LoadingSpinner />
		</div>
	);
}

export default Spinner;
