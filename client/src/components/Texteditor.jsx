import React from "react";
import { Field, ErrorMessage } from "formik";
import JoditEditor from "jodit-react";

function TextEditorField({ name,label , placeholder }) {
	const config = {
		theme:"dark",
		toolbarSticky: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
		buttons: "bold,italic,underline,strikethrough,link",
		showPlaceholder: false,
		placeholder: placeholder || "Your text here",
	};
	return (
		<div>
			{label && <label>{label}</label>}
			<Field name={name}>
				{({ field, form }) => (
					<JoditEditor
						value={field.value}
						config={config}
						onBlur={(newContent) => form.setFieldValue(name, newContent)}
						// onChange={(newContent) => form.setFieldValue(name, newContent)}
					/>
				)}
			</Field>
			<ErrorMessage name={name} component="div" className="error" />
		</div>
	);
}

export default TextEditorField;

