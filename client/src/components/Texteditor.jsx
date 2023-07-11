import React from "react";
import { Field, ErrorMessage } from "formik";
import JoditEditor from "jodit-react";

/**
 * Renders a rich text editor field component with the ability to add links and much more.
 *
 * @param {object} name - The name of the field.
 * @param {string} label - The label for the field.
 * @param {string} placeholder - The placeholder text for the field.
 * @return {JSX.Element} The rendered text editor field component.
 */
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

