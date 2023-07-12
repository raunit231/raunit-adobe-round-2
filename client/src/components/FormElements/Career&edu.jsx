import React, {  useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex, setCareerAndEducationInformation } from "../../state/userSlice";
/**
 * Renders the CareerAndEducation component.
 *
 */
function CareerAndEducation() {
  const dispatch = useDispatch();
	const mainElementRef = useRef(null);
	const educationSchema = {
		school_name: "",
		starting_year: "",
		ending_year: "",
		description: "",
	};
	const config = {
		theme: "dark",
		toolbarSticky: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
		buttons: "bold,italic,underline,strikethrough,link",
		showPlaceholder: false,
		placeholder:"Your text here",
	};
	const initialValues = useSelector(
		(state) => state.user.career_and_education_information
	);
	const educationValidationSchema = Yup.object({
		school_name: Yup.string().required("School Name is required"),
		starting_year: Yup.string().required("Starting Year is required"),
		ending_year: Yup.string().required("Ending Year is required"),
		description: Yup.string().required("Description is required"),
	});
	const validationSchema = Yup.object({
		job_title: Yup.string().required("Job Title is required"),
		career_objective: Yup.string().required("Career Objective is required"),
		skills: Yup.array().of(Yup.string().required("Skill is required")),
		education: Yup.array().of(educationValidationSchema),
	});
	/**
	 * Renders an input field with a label, placeholder, and error message.
	 *
	 * @param {Object} props - The properties for the input field.
	 * @param {string} props.label - The label for the input field.
	 * @param {string} props.name - The name of the input field.
	 * @param {string} props.placeholder - The placeholder for the input field.
	 * @return {JSX.Element} The input field component.
	 */
	const InputField = ({ label, name, placeholder }) => {
		return (
			<div className=" w-full flex flex-col mb-2">
				{label && <label>{label}</label>}
				<Field
					className="w-[90%] placeholder:italic placeholder:text-sm"
					placeholder={placeholder}
					name={`${name}`}
					type="text"
				/>
				<ErrorMessage
					name={`${name}`}
					component={"div"}
					className="error-message"
				/>
			</div>
		);
	};

	/**
	 * Handles the submit event.
	 *
	 * @param {object} values - The values submitted by the user.
	 */
	const handleSubmit = (values) => {
    dispatch(setCareerAndEducationInformation(values));
		const element = mainElementRef.current;
		element.classList.remove("enter-animation");
		element.classList.add("exit-animation");
    setTimeout(() => {
			element.classList.remove("exit-animation");
			dispatch(setActiveIndex(3));
		}, 300);
	};
	// handles the previous event
	const handlePrevious = () => {
		const element = mainElementRef.current;
		element.classList.remove("enter-animation")
		element.classList.add("exit-animation");
		setTimeout(() => {
			element.classList.remove("exit-animation");
			dispatch(setActiveIndex(1));
		}, 300);
	}

	return (
		<div
			ref={mainElementRef}
			className={`w-[70%] py-10  mx-auto h-full enter-animation career-and-edu`}
		>
			<Formik
				onSubmit={handleSubmit}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				{({ values }) => (
					<Form>
						<div>
							<div>
								<h1>Job</h1>
								<p className="italic text-sm mb-2">Add job retailed details</p>
							</div>
							<div className="flex flex-col space-y-6 ">
								<div className="lg:grid grid-cols-2 sm:flex sm:flex-col">
									<InputField label="Job Title" name="job_title" />
									<InputField
										label="Career Objective"
										name="career_objective"
									/>
								</div>
								<div>
									<h1>Skills</h1>
									<p className="italic text-sm mb-2">
										Add your relevant skills
									</p>
									<div>
										<FieldArray name="skills">
											{({ push }) => (
												<div className="lg:grid grid-cols-2 sm:flex sm:flex-col gap-y-4">
													{values.skills.map((skill, index) => (
														<InputField
															name={`skills[${index}]`}
															placeholder="Skill"
															key={index}
														/>
													))}
													<div className="col-span-2">
														<div className="flex justify-end mt-5">
															<button
																type="button"
																onClick={() => push("")}
																className="btn-2"
															>
																Add more skill
															</button>
														</div>
													</div>
												</div>
											)}
										</FieldArray>
									</div>
								</div>
								<div>
									<h1>Education</h1>
									<p className="italic text-sm mb-2">
										Add your relevant education details
									</p>
									<div className="flex flex-col space-y-3">
										<FieldArray name="education">
											{({ push }) => (
												<div className="flex flex-col space-y-3">
													{values.education.map((edu, index) => (
														<div
															key={index}
															className="border border-gray-300 p-2 rounded-lg"
														>
															<div className="lg:grid grid-cols-2 sm:flex sm:flex-col">
																<InputField
																	label="School Name"
																	name={`education[${index}].school_name`}
																/>
																<div></div>
																<InputField
																	label="Starting Year"
																	name={`education[${index}].starting_year`}
																/>
																<InputField
																	label="Ending Year"
																	name={`education[${index}].ending_year`}
																/>
																<div className="col-span-2">
																	<div>
																		{<label>{"Description"}</label>}
																		<Field
																			name={`education[${index}].description`}
																		>
																			{({ field, form }) => (
																				<JoditEditor
																					value={field.value}
																					config={config}
																					onBlur={(newContent) =>
																						form.setFieldValue(
																							`education[${index}].description`,
																							newContent
																						)
																					}
																					// onChange={(newContent) => form.setFieldValue(name, newContent)}
																				/>
																			)}
																		</Field>
																		<ErrorMessage
																			name={`education[${index}].description`}
																			component="div"
																			className="error-message"
																		/>
																	</div>
																</div>
															</div>
														</div>
													))}
													<div className="flex justify-end mt-5">
														<button
															onClick={() => push(educationSchema)}
															className="btn-2"
														>
															Add more education
														</button>
													</div>
												</div>
											)}
										</FieldArray>

										<div className="flex space-x-[10%] justify-center pt-4 pb-8">
											<button className="btn w-[70%]" style={{"backgroundColor" : "#00a3bf","color" : "#fff"}} type="button" onClick={handlePrevious} >
												Previous
											</button>
											<button className="btn w-[70%]" type="submit">
												Next
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default CareerAndEducation;
