import React, { useState, useEffect } from 'react';
import '../../Style/Admin/ProjectAllocation.css';
import { Button, Modal, Form } from 'react-bootstrap';

import AddUserApi from "../../Service/Admin/UserApi"
import ProjectAllocationApi from "../../Service/Admin/ProjectAllocation"
import { toast } from 'react-toastify';
const userApi = new AddUserApi()
const projectAllocationApi = new ProjectAllocationApi()
function ProjectAllocation() {
  const [activeAccordion, setActiveAccordion] = useState('projects');
  const [projectData, setProjectData] = useState([]);
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [isUpdateProjectModalOpen, setUpdateProjectModalOpen] = useState(false);
  const [userids,setUserIds] = useState([])
  const [newProject, setNewProject] = useState({

    project_name: '',
    start_date: '',
    end_date: '',
    users_alloc: [],
    client_name : ''
  });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isFormValid, setFormValid] = useState(true);
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {

    let response = await userApi.getAllUsers()
    // console.log(response)
    setUsers(response)
  }

  const getAllProjectsData = async () =>{
    let response = await projectAllocationApi.getAllProjects()
    console.log(response)
    if (response.status){
      setProjectData(response.data.projects)
    }
      
    
  }
  useEffect(() => {
    getAllUsersData();
    getAllProjectsData()

  }, [])



  const handleAccordionClick = (accordionId) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? null : accordionId
    );
  };

  // Function to toggle the Add Project modal
  const toggleAddProjectModal = () => {
    setNewProject({
      id: '',
      project_name: '',
      start_date: '',
      end_date: '',
      users_alloc: [], 
      client_name : ''
    });
    setAddProjectModalOpen((prevIsOpen) => !prevIsOpen);
  };

  // Function to toggle the Update Project form modal
  const toggleUpdateProject = (index) => {
    setSelectedProjectIndex(index);
    setNewProject(projectData[index]); // Initialize the form with the data of the selected project
    setUpdateProjectModalOpen((prevIsOpen) => !prevIsOpen);
  };

  // Function to handle input changes in the Add/Update Project form
  // const handleInputChange = (event) => {
  //   const { name, value, type,id} = event.target;
  //   if (type === 'checkbox') {
  //     const isChecked = event.target.checked;
  //     const userName = event.target.name; // User name
  //     const updatedUsersAlloc = isChecked
  //       ? [...newProject.users_alloc, userName]
       
  //       : newProject.users_alloc.filter((name) => name !== userName);
  //     setNewProject((prevNewProject) => ({
  //       ...prevNewProject,
  //       users_alloc: updatedUsersAlloc,
  //     }));
  //   } else {
  //     setNewProject((prevNewProject) => ({
  //       ...prevNewProject,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    if (type === 'checkbox') {
      const isChecked = event.target.checked;
      const userId = parseInt(event.target.name, 10); // Parse the ID as an integer
      const updatedUsersAlloc = isChecked
        ? [...newProject.users_alloc, userId]
        : newProject.users_alloc.filter((id) => id !== userId);
      setNewProject((prevNewProject) => ({
        ...prevNewProject,
        users_alloc: updatedUsersAlloc,
      }));
    } else {
      setNewProject((prevNewProject) => ({
        ...prevNewProject,
        [name]: event.target.value,
      }));
    }
  };
  
  // Function to handle form submission for adding a new project
  const handleSubmit = async() => {
    // Check if all required fields are filled
    const isFormValid =
      newProject.project_name.trim() !== '' &&
      newProject.start_date.trim() !== '' &&
      newProject.end_date.trim() !== '' &&
      newProject.users_alloc.length > 0 &&
      newProject.client_name.trim() !== ''

    // Update isFormValid state based on form validity
    setFormValid(isFormValid);

    if (isFormValid) {
      const response = await projectAllocationApi.AddProject(newProject);
    
      
      if (response.status) {
        const project_id = response.project.id;
        console.log(project_id,newProject.users_alloc, "userallocation")
        let status = await projectAllocationApi.allocateProjectToEachUser(project_id,newProject.users_alloc)
        console.log(status, "this is status")
        if (status){
          getAllProjectsData()
          toast.success("Project added successfully",{
            autoClose:1000
          })
        }
       
      }
      else{
        toast.error("Project already existed",{
          autoClose:1000
        })
      }
    }
    
    
      
      // setProjectData((prevProjectData) => [...prevProjectData, newProject]);
      // // Clear the form fields
      // setNewProject({
      //   project_name: '',
      //   start_date: '',
      //   end_date: '',
      //   users_alloc: [], // Array of user names
      // });
      setAddProjectModalOpen(false);

      // Log new project data to console
     
    
  };

  // Function to handle form submission for updating a project
  const handleUpdate = () => {
    // Check if all required fields are filled
    const isFormValid =
      newProject.project_name.trim() !== '' &&
      newProject.start_date.trim() !== '' &&
      newProject.end_date.trim() !== '' &&
      newProject.users_alloc.length > 0 && // At least one user selected
   

    // Update isFormValid state based on form validity
    setFormValid(isFormValid);

    if (isFormValid) {
      const updatedProjectData = [...projectData];
      updatedProjectData[selectedProjectIndex] = newProject;
      setProjectData(updatedProjectData);
      setNewProject({
        id: '',
        project_name: '',
        start_date: '',
        end_date: '',
        users_alloc: []
      });
      setUpdateProjectModalOpen(false);

      // Log updated project data to console
      console.log('Updated Project:', newProject);
    }
  };

  // Function to handle form submission for deleting a project
  const handleDelete = (projectId) => {
    const updatedProjectData = projectData.filter(
      (project) => project.id !== projectId
    );
    setProjectData(updatedProjectData);
    setUpdateProjectModalOpen(false);

    // Log the ID of the deleted project
    console.log('Project deleted, ID:', projectId);
  };


  const [searchInput, setSearchInput] = useState('');

  // Function to handle changes in the search input
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter users based on the search input
  const filteredProjects = projectData && projectData.filter((project) => {
    const projName = `${project.project_name} `.toLowerCase();
    return projName.includes(searchInput.toLowerCase());
  });

  // Add a variable to hold the users to be displayed
  const projectsToDisplay = searchInput.trim() === '' ? projectData && projectData : filteredProjects;


  return (
    <div className="project-allocation-container">
      <div className="accordion project-accordion-item" id="projectAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="projects">
            <button
              className={`accordion-button accordion-button-custom ${activeAccordion === 'projects' ? '' : 'collapsed'
                }`}
              type="button"
              onClick={() => handleAccordionClick('projects')}
            >
              Projects
            </button>
          </h2>
          <div
            id="collapseProjects"
            className={`accordion-collapse collapse ${activeAccordion === 'projects' ? 'show' : ''
              }`}
            aria-labelledby="projects"
            data-bs-parent="#projectAccordion"
          >
            <div className="accordion-body">
              {activeAccordion === 'projects' && (
                <>
                  <div className="search-bar">
                    <input
                      type="text"
                      className='Searchelement'
                      placeholder="Search by Project-name..."
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                  <div className='project-table-container'>
                    <table className="tableadmin">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          {/* <th>Allocated Team</th> */}
                         
                          <th>Client Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsToDisplay.map((project, index) => (
                          <tr key={project.index}>
                            <td>{project.project_name}</td>
                            <td>{project.start_date}</td>
                            <td>{project.end_date}</td>
                            <td>{project.client_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className=" btn-add "
                    onClick={toggleAddProjectModal}
                  >
                    Add Project
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal
        show={isAddProjectModalOpen}
        onHide={toggleAddProjectModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="project_name">
              <Form.Label>Proj-name:</Form.Label>
              <Form.Control
                type="text"
                name="project_name"
                value={newProject.project_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="start_date">
              <Form.Label>Start-Date:</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={newProject.start_date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_date">
              <Form.Label>End-Date:</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={newProject.end_date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="Client Name">
              <Form.Label>Client Name:</Form.Label>
              <Form.Control
                type="text"
                name="client_name"
                value={newProject.client_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="users_alloc">
  <Form.Label>Team-Alloc:</Form.Label>
  <div className="user-list user-list-scroll">
    {users.map((user) => (
      <Form.Check
        key={user.id}
        type="checkbox"
        label={user.email}
        name={user.id} // Use user ID as the input name
        checked={newProject.users_alloc.includes(user.id)}
        onChange={handleInputChange}
      />
    ))}
  </div>
</Form.Group>
          </Form>
          {!isFormValid && (
            <div className="text-danger">Please fill in all fields.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-add" onClick={handleSubmit}>
           Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Project Modal */}
      <Modal
        show={isUpdateProjectModalOpen}
        onHide={() => setUpdateProjectModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="project_name">
              <Form.Label>Proj-name:</Form.Label>
              <Form.Control
                type="text"
                name="project_name"
                value={newProject.project_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="start_date">
              <Form.Label>Start-Date:</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={newProject.start_date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="end_date">
              <Form.Label>End-Date:</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={newProject.end_date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="users_alloc">
              <Form.Label>User-Alloc:</Form.Label>
              <div className="user-list user-list-scroll">
                {users.map((user) => (
                  <div key={user.id}>
                    {/* Debugging: Check the user object */}
                    <Form.Check
                      type="checkbox"
                      label={user.email}
                      name={user.email}
                      checked={newProject.users_alloc.includes(user.id)}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
          </Form>
          {!isFormValid && (
            <div className="text-danger">Please fill in all fields.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-delete"
            onClick={() => handleDelete(newProject.id)}
          >
            Delete Project
          </Button>
          <Button className="btn-update" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default ProjectAllocation;