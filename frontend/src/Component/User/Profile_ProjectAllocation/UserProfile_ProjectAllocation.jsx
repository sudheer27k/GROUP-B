import React, { useState, useEffect } from 'react';
import '../../../Style/Profile_ProjectAllocation/UserProfile_ProjectAllocation.css'
import 'font-awesome/css/font-awesome.min.css';
import ContactForm from './Edit_form';
import GetLoginUser from "../../../Service/Profile_ProjectAllocation/Profile_ProjectAllocation"
const getLoginUser = new GetLoginUser()


const UserProfile_ProjectAllocation = () => {
    const [initialLetter, setInitialLetter] = useState('');
    const [userData, setUserData] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isEditButtonVisible, setEditButtonVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [projectsData,setProjectsData] = useState([])

    const loginUser = async () => {
        let id = localStorage.getItem("id")
        if (id){
            const response = await getLoginUser.getLoginUserDetails(id)
            setUserData(response)
        }
       
    }
    const projectAllocationDetalils = async() =>{
        let id = localStorage.getItem("id")
        
        if(id){
            const response = await getLoginUser.UserProjectAllocationDetails(id)
            setProjectsData(response.data)
        }
    }
    useEffect(() => {
        loginUser()
        projectAllocationDetalils()
    }, [])


    useEffect(() => {
        // Function to extract the initial letters from first and last names
        const extractInitialLetters = () => {
            const nameElement = document.getElementById('name');
            if (nameElement && nameElement.textContent) {
                const nameParts = nameElement.textContent.split(' ');
                const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
                const initialString = initials.join('');
                setInitialLetter(initialString);
            }
        };

        extractInitialLetters();
    }, [userData]);



    const handleEditClick = () => {
        setPopupVisible(!isPopupVisible);
        // setEditButtonVisible(false);
    };

    return (
        <div className='content'>
            <div className='user'>
                <div className='user-photo'>
                    <div id='initial-letter'>{initialLetter}</div>
                </div>
                <div className='user-name'>
                    <div className='column'>


                        <div>
                            <h3 id='name'>Name: {userData.first_name}</h3>
                            <h3>Designation: {userData.designation}</h3>
                            <h3>Blood Group:  {userData.blood_grp}</h3>
                        </div>
                        <div>
                            {/* <h3>ID : 14</h3> */}
                            <h3>DOB   :  {userData.dob}</h3>
                            <h3>Contact: {userData.contact_no}</h3>
                        </div>
                    </div>
                </div>
                <div className='btn'>

                </div>
                {isPopupVisible && (
                    <div className='popup'>
                        <ContactForm />
                        <div className='button-container'>
                            <button className='close-btn' onClick={handleEditClick}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div className='project-details'>
                    <div className='table-container'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Client Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectsData && projectsData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.project_name}</td>
                                        <td>{item.start_date}</td>
                                        <td>{item.end_date}</td>
                                        <td>{item.client_name}</td>
                                    </tr>
                                ))}
                                {/*             
                <tr>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                </tr>
                <tr>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                  <td>Data 1</td>
                </tr>          */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile_ProjectAllocation;
