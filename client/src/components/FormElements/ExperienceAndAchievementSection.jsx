import React, { useRef }  from "react";
import JoditEditor from "jodit-react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	setActiveIndex,
	setExperienceAndAchievementInformation,
	setFinalData,
	setIsLoading,
} from "../../state/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ExperienceAndAchievementSection() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const mainElementRef = useRef(null);
	const experienceSchema = {
		company_name: "",
		starting_year: "",
		ending_year: "",
		responsibilities: "",
	};
	const achievementSchema = {
		field: "",
		awards: "",
	};
	let initialValues = useSelector(
		(state) => state.user.experience_and_achievement_information
	);
	const experienceValidationSchema = Yup.object({
		company_name: Yup.string().required("Company Name is required"),
		starting_year: Yup.string().required("Starting Year is required"),
		ending_year: Yup.string().required("Ending Year is required"),
		responsibilities: Yup.string().required("Responsibilities is required"),
	});
	const achievementValidationSchema = Yup.object({
		field: Yup.string().required("Field is required"),
		awards: Yup.string().required("Awards is required"),
	});
	const validationSchema = Yup.object({
		experience: Yup.array().of(experienceValidationSchema),
		achievements: Yup.array().of(achievementValidationSchema),
	});
	const config = {
		theme: "dark",
		toolbarSticky: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
		buttons: "bold,italic,underline,strikethrough,link",
		showPlaceholder: false,
		placeholder: "Your text here",
	};
/**
 * Renders an input field component.
 *
 * @param {Object} props - The props object containing the label, name, and placeholder.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.placeholder - The placeholder for the input field.
 * @return {JSX.Element} The rendered input field component.
 */
	const InputField = ({ label, name, placeholder }) => {
		return (
			<div className=" w-full flex flex-col">
				{label && <label>{label}</label>}
				<Field
					className="w-[90%] placeholder:italic placeholder:text-sm"
					placeholder={placeholder}
					name={name}
					type="text"
				/>
				<ErrorMessage name={name} component={"div"} className="error-message" />
			</div>
		);
	};
	const template_id = useSelector((state) => state.user.template_id);
	const personal_information = useSelector(
		(state) => state.user.personal_information
	);
	const career_and_education_information = useSelector(
		(state) => state.user.career_and_education_information
	);

	const education = career_and_education_information.education.map((data) => {
		const passing_year = `${data.starting_year}-${data.ending_year}`;
		const { school_name, description } = data;
		return {
			passing_year,
			school_name,
			description:description.slice(3,-4),
		};
	});

	const { job_title, career_objective, skills } =
		career_and_education_information;

	const inputData = {
		template_id: `${template_id}`,
		personal_information,
		job_title,
		career_objective,
		skills,
		education,
	};
	/**
	 * Handles the form submission asynchronously.
	 * makes a post request to the backend API
	 * saves the value into finalData variable in the redux store
	 * and navigates to the next page
	 * @param {object} values - The values from the form submission.
	 * 
	 */
	const handleSubmit = async (values) => {
		dispatch(setIsLoading(true));
		dispatch(setExperienceAndAchievementInformation(values));
		let { achievements } = values;
		achievements = achievements.map((data) => {
			const { field, awards } = data;
			return { field, awards:awards.slice(3,-4) };
		})
		const experience = values.experience.map(
			(data) => {
				const { company_name, starting_year, ending_year, responsibilities } =
					data;
				const passing_year = `${starting_year}-${ending_year}`;
				return {
					company_name,
					passing_year,
					responsibilities:responsibilities.slice(3,-4),
				};
			}
		);
		const url = "https://resume-builer-app.onrender.com/resume";
		try {
			console.log("Making request with inputData:", { ...inputData,achievements,experience });
			const response = await axios.post(url, {...inputData,experience,achievements}, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/pdf",
				},
				responseType: "blob",
			});
			const pdfBlob = new Blob([response.data], { type: "application/pdf" });
			dispatch(setFinalData(URL.createObjectURL(pdfBlob)));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setIsLoading(false));
		}
		navigate("/pdfviewer");

	};
		const handlePrevious = () => {
			const element = mainElementRef.current;
			element.classList.remove("enter-animation");
			element.classList.add("exit-animation");
			setTimeout(() => {
				element.classList.remove("exit-animation");
				dispatch(setActiveIndex(2));
			}, 300);
		};
	return (
		<>
			<div className={`w-[70%] h-full py-10  mx-auto relative enter-animation`} ref={mainElementRef}>
				<Formik
					onSubmit={handleSubmit}
					initialValues={initialValues}
					validationSchema={validationSchema}
				>
					{({ values }) => (
						<Form>
							<div>
								<div>
									<h1>Experience</h1>
									<p className="italic text-sm mb-2">
										Add your past job experiences
									</p>
								</div>
								<div>
									<FieldArray name="experience">
										{({ push }) => (
											<div className="flex flex-col space-y-3">
												{values.experience.map((exp, index) => {
													return (
														<div
															key={index}
															className="border border-gray-300 p-2 rounded-lg"
														>
															<div className="lg:grid grid-cols-2 sm:flex sm:flex-col">
																<InputField
																	label="Company Name"
																	name={`experience[${index}].company_name`}
																/>
																<div></div>
																<InputField
																	label="Starting Year"
																	name={`experience[${index}].starting_year`}
																/>
																<InputField
																	label="Ending Year"
																	name={`experience[${index}].ending_year`}
																/>
																<div className="col-span-2">
																	<div>
																		{<label>{"Responsibilities"}</label>}
																		<Field
																			name={`experience[${index}].responsibilities`}
																		>
																			{({ field, form }) => (
																				<JoditEditor
																					value={field.value}
																					config={config}
																					onBlur={(newContent) =>
																						form.setFieldValue(
																							`experience[${index}].responsibilities`,
																							newContent
																						)
																					}
																					// onChange={(newContent) => form.setFieldValue(name, newContent)}
																				/>
																			)}
																		</Field>
																		<ErrorMessage
																			name={`experience[${index}].responsibilities`}
																			component="div"
																			className="error-message"
																		/>
																	</div>
																</div>
															</div>
														</div>
													);
												})}
												<div className="flex justify-end mt-5">
													<button
														onClick={() => push(experienceSchema)}
														className="btn-2"
													>
														Add more experience
													</button>
												</div>
											</div>
										)}
									</FieldArray>
								</div>
								<div>
									<h1>Achievements</h1>
									<p className="italic text-sm mb-2">
										Add your accomplishments
									</p>
								</div>
								<div>
									<FieldArray name="achievements">
										{({ push }) => (
											<div className="flex flex-col space-y-3">
												{values.achievements.map((ach, index) => {
													return (
														<div
															key={index}
															className="border border-gray-300 p-2 rounded-lg"
														>
															<div className="lg:grid grid-cols-2 sm:flex sm:flex-col">
																<InputField
																	label="Field"
																	name={`achievements[${index}].field`}
																/>
																<div className="col-span-2">
																	<div>
																		{<label>{"Award Details"}</label>}
																		<Field
																			name={`achievements[${index}].awards`}
																		>
																			{({ field, form }) => (
																				<JoditEditor
																					value={field.value}
																					config={config}
																					onBlur={(newContent) =>
																						form.setFieldValue(
																							`achievements[${index}].awards`,
																							newContent
																						)
																					}
																					// onChange={(newContent) => form.setFieldValue(name, newContent)}
																				/>
																			)}
																		</Field>
																		<ErrorMessage
																			name={`achievements[${index}].awards`}
																			component="div"
																			className="error-message"
																		/>
																	</div>
																</div>
															</div>
														</div>
													);
												})}
												<div className="flex justify-end mt-5">
													<button
														onClick={() => push(achievementSchema)}
														className="btn-2"
													>
														Add more achievements
													</button>
												</div>
											</div>
										)}
									</FieldArray>
								</div>
								<div className="flex justify-center space-x-[10%] pt-4 pb-8">
									<button
										className="btn w-[70%]"
										style={{ backgroundColor: "#00a3bf", color: "#fff" }}
										type="button"
										onClick={handlePrevious}
									>
										Go Back
									</button>
									<button className="btn w-[70%]" type="submit">
										Submit Details
									</button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
}

export default ExperienceAndAchievementSection;
