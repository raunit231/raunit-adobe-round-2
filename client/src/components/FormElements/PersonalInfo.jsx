import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex, setPersonalInformation } from "../../state/userSlice";

/**
 * Renders a form for entering personal information.
 *
 * @param {type} dispatch - a Redux dispatch function
 * @param {type} initialValues - the initial values for the form fields
 * @param {type} validationSchema - the validation schema for the form fields
 * @param {type} InputField - a reusable component for rendering input fields
 * @param {type} handleSubmit - a function to handle form submission
 * @return {type} the rendered form component
 */
function PersonalInfo() {
	const dispatch = useDispatch();
	const initialValues = useSelector(state => state.user.personal_information);
	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		last_name: Yup.string().required("Last Name is required"),
		email_address: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		phone_number: Yup.string().required("Phone Number is required"),
		linkedin_url: Yup.string().required("Profile Link is required"),
	});
  const InputField = ({ label, name}) => {
    return (
			<div className=" w-full flex flex-col my-3">
				<label>{label}</label>
				<Field
					className="w-[90%] placeholder:italic placeholder:text-sm"
					name={name}
					type="text"
				/>
				<ErrorMessage name={name} component={"div"} className="error-message" />
			</div>
		);
  }
	const handleSubmit = (values) => {
		dispatch(setPersonalInformation(values));
		dispatch(setActiveIndex(2));
  };
	return (
		<div
			className={`w-[70%] h-full py-10  mx-auto`}
		>
			<h1 className="text-lg mb-5">Personal Details</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<div className="flex flex-col space-y-12 w-full ">
						<div className="lg:grid grid-cols-2 sm:flex sm:flex-col  items-center">
							<InputField label="Name" name="name" />
							<InputField label="Last Name" name="last_name" />
							<InputField label="Email Address" name="email_address" />
							<InputField label="Phone Number" name="phone_number" />
							<InputField label="LinkedIn URL" name="linkedin_url" />
							<div className="form-input-field"></div>
						</div>
						<div className="flex justify-center">
							<button className="btn w-[70%]" type="submit">
								Next
							</button>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

export default PersonalInfo;
