import React from 'react'
import Navbar from '../components/Navbar'
import './Templates.css'
import { useDispatch } from 'react-redux'
import { setTemplateId } from '../state/userSlice';
import { useNavigate } from 'react-router-dom';

/**
 * The Templates function is a React component that displays a list of templates and allows the user to
 * select one by clicking on an image.
 * @returns The Templates component is returning a JSX element.
 */
function Templates({templateId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 /**
  * The function redirects to the '/user-info' page after setting the template id.
  */
  const redirect = (id) => {
    dispatch(setTemplateId(id));
    navigate('/user-info');
  }
  return (
    <div>
      <Navbar/>
      <div className='flex flex-col items-center space-y-12 my-12'>
        <h1>Choose a template</h1>
        <div className='template__container'>
          <img src={require("../assets/template1.png")} alt="template 1" onClick={() => redirect(1)} />
          <img src={require("../assets/template2.png")} alt="template 2" onClick={() => redirect(2)}/>
          <img src={require("../assets/template3.png")} alt="template 3" onClick={() => redirect(3)}/>
        </div>
      </div>
    </div>
  )
}

export default Templates