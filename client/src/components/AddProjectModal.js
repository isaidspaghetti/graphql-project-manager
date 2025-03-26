import { useState } from "react";
import { FaUser, FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQuery";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQuery";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  // Get Clients for Select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    //update the cache with return values of addProject
    update(cache, { data: addProject }) {
      // Set those return values to the cache value in app
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || status === "" || description === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, clientId, status);
    setName("");
    setClientId("");
    setDescription("");
    setStatus("new");
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className={"d-flex align-items-center"}>
              <FaList className={"icon"} />
              <div>Add Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModal"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title fs-5" id="addProjectModal">
                    New Project
                  </h3>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  <form onSubmit={handleSubmit}>
                    <div className={"mb-3"}>
                      <label className={"form-label"}>Name</label>
                      <input
                        type="text"
                        className={"form-control"}
                        id={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className={"mb-3"}>
                      <label className={"form-label"}>Description</label>
                      <textarea
                        className={"form-control"}
                        id={"description"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className={"mb-3"}>
                      <label className={"form-label"}>Status</label>
                      <select
                        className={"form-select"}
                        id={"status"}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value={"new"}>Not Started</option>
                        <option value={"progress"}>In Progress</option>
                        <option value={"completed"}>Completed</option>
                      </select>
                    </div>
                    <div className={"mb-3"}>
                      <label className={"form-label"}>Client</label>
                      <select
                        className={"form-select"}
                        id={"client"}
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value={""}>Select Client</option>
                        {data.clients.map((client) => (
                          <option id={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss={"modal"}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
