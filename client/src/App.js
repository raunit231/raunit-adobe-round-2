import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Templates from "./pages/Templates";
import UserForm from "./pages/Form";
import PDFViewer from "./pages/PdfViewer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Templates />} />
				<Route path="/user-info" element={<UserForm />} />
        <Route path="/pdfviewer" element={<PDFViewer/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
