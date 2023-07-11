import React from "react";
import PersonalInfo from "../components/FormElements/PersonalInfo";
import Navbar from "../components/Navbar";
import CareerAndEducation from "../components/FormElements/Career&edu";
import ExperienceAndAchievementSection from "../components/FormElements/ExperienceAndAchievementSection";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

/* The `UserForm` function is a React component that renders a form based on the value of `activeIndex`
and `isLoading` variables. */
function UserForm() {
  const activeIndex = useSelector(state => state.user.activeIndex);
	const isLoading = useSelector(state => state.user.isLoading);
	const styles = {
		"height": "100vh",
		"width": "100vw",
		"overflow":"hidden"
	}
	return (
		<div className="min-h-screen pb-2" style={isLoading ? styles : {}}>
			{isLoading && <Spinner />}
			<Navbar />
			<div className="w-[95%] flex flex-col justify-center h-full items-center relative">
				{activeIndex === 1 && <PersonalInfo />}
				{activeIndex === 2 && <CareerAndEducation />}
				{activeIndex === 3 && <ExperienceAndAchievementSection />}
			</div>
		</div>
	);
}

export default UserForm;
