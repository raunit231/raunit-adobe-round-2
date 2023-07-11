import React from "react";
import { useSelector } from "react-redux";



function PDFViewer() {
	const pdfData = useSelector(state => state.user.finalData);

	return (
		<div className="w-screen h-screen">
      <object data={pdfData}  type="application/pdf" height={"100%"} width={"100%"} aria-label="pdf"/>
		</div>
	);
}

export default PDFViewer;





	// const [numPages, setNumPages] = useState(null);

	// function onDocumentLoadSuccess({ numPages }) {
	// 	setNumPages(numPages);
	// }
  // const MobileView = () => {
	// 	return (
	// 		<Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
	// 			{Array.from(new Array(numPages), (el, index) => (
	// 				<Page
	// 					key={`page_${index + 1}`}
	// 					pageNumber={index + 1}
	// 					className="pdf-page"
	// 				/>
	// 			))}
	// 		</Document>
	// 	);
	// }