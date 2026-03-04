import { useState, createContext } from "react";

export const PortfolioContext = createContext({
  //   selectedProjectId: "",
  view: "fff",
  //   projectView: "",
  //   projects: [],
  //   tasks: [],
  //   startNewProject: () => {},
  //   cancelNewProject: () => {},
  //   addProject: () => {},
  //   selectProject: () => {},
  //   deleteProject: () => {},
  //   addTask: () => {},
  //   deleteTask: () => {},
  //   updateView: () => {},
});

export default function PortfolioContextProvider({ children }) {
  const [masterProjects, setMasterProjects] = useState({
    // selectedProjectId: undefined,
    view: "ABOUT",
    // projectView: undefined,
    // projects: [],
    // tasks: [],
  });

  //   function handleStartNewProject() {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         selectedProjectId: null,
  //         projectView: "NEW_PROJECT",
  //       };
  //     });
  //   }

  //   function handleCancelNewProject() {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         selectedProjectId: undefined,
  //         projectView: undefined,
  //       };
  //     });
  //   }

  //   function handleAddProject(newProjectData) {
  //     const newProject = {
  //       ...newProjectData,
  //       id: new Date().valueOf(),
  //     };
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         selectedProjectId: undefined,
  //         projectView: undefined,
  //         projects: [...prevState.projects, newProject],
  //       };
  //     });
  //   }

  //   function handleSelectProject(id) {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         selectedProjectId: id,
  //         projectView: "PROJECT_DETAILS",
  //       };
  //     });
  //   }

  //   function handleDeleteProject() {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         selectedProjectId: undefined,
  //         projectView: undefined,
  //         projects: prevState.projects.filter(
  //           (project) => project.id !== prevState.selectedProjectId,
  //         ),
  //       };
  //     });
  //   }

  //   function handleAddTask(text) {
  //     setMasterProjects((prevState) => {
  //       const newTask = {
  //         task: text,
  //         projectId: prevState.selectedProjectId,
  //         id: new Date().valueOf(),
  //       };
  //       return {
  //         ...prevState,
  //         tasks: [...prevState.tasks, newTask],
  //       };
  //     });
  //   }

  //   function handleDeleteTask(id) {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         tasks: prevState.tasks.filter((task) => task.id !== id),
  //       };
  //     });
  //   }

  //   function handleUpdateView(view) {
  //     setMasterProjects((prevState) => {
  //       return {
  //         ...prevState,
  //         view: view,
  //       };
  //     });
  //   }

  const ctxValue = {
    // selectedProjectId: masterProjects.selectedProjectId,
    view: masterProjects.view,
    // projectView: masterProjects.projectView,
    // projects: masterProjects.projects,
    // tasks: masterProjects.tasks,
    // startNewProject: handleStartNewProject,
    // cancelNewProject: handleCancelNewProject,
    // addProject: handleAddProject,
    // selectProject: handleSelectProject,
    // deleteProject: handleDeleteProject,
    // addTask: handleAddTask,
    // deleteTask: handleDeleteTask,
    // updateView: handleUpdateView,
  };

  return (
    <PortfolioContext.Provider value={ctxValue}>
      {children}
    </PortfolioContext.Provider>
  );
}
