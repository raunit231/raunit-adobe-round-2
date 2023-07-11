import React from "react";
import { useSelector } from "react-redux";

// Pdf viewer element

function PDFViewer() {
	// getting the final data from the backend api saved in redux 
	const pdfData = useSelector(state => state.user.finalData);

	return (
		<div className="w-screen h-screen">
      <object data={pdfData}  type="application/pdf" height={"100%"} width={"100%"} aria-label="pdf"/>
		</div>
	);
}

export default PDFViewer;

