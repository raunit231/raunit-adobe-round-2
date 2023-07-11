import { createSlice } from "@reduxjs/toolkit";

// necessary reducer and variable for managing state
const educationSchema = {
	school_name: "",
	starting_year: "",
	ending_year: "",
	description: "",
};
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
const initialState = {
	template_id: 1,
	activeIndex:1,
	isLoading:false,
	personal_information: {
		name: "",
		last_name: "",
		email_address: "",
		phone_number: "",
		linkedin_url: "",
	},
	career_and_education_information: {
		job_title: "",
		career_objective: "",
		skills: [""],
		education: [educationSchema],
	},
	experience_and_achievement_information: {
		experience: [experienceSchema],
		achievements: [achievementSchema],
	},
	finalData:null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
		setTemplateId: (state, action) => {
			state.template_id = action.payload;
		},
		setActiveIndex: (state, action) => {
			state.activeIndex = action.payload;
		},
		setPersonalInformation: (state, action) => {
			state.personal_information = action.payload;
		},
		setCareerAndEducationInformation: (state, action) => {
			state.career_and_education_information = action.payload;
		},
		setExperienceAndAchievementInformation: (state, action) => {
			state.experience_and_achievement_information = action.payload;
		},
		setFinalData: (state, action) => {
			state.finalData = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		}
  }
});

export const { setTemplateId, setActiveIndex, setPersonalInformation, setCareerAndEducationInformation, setExperienceAndAchievementInformation,setFinalData,setIsLoading } = userSlice.actions;

export default userSlice.reducer;