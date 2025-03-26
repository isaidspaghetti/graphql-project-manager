import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";

export default function ClientRow({ client }) {
  const [deleteClient] = // get the function we created in the mutation
    useMutation(DELETE_CLIENT, {
      // args: mutation query, variables to pass in
      variables: { id: client.id },
      refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // how you can refresh data in page withou a cache

      // Or just use a cache, removing the client from the query
      // update(cache, { data: { deleteClient } }) {
      //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
      //   cache.writeQuery({
      //     query: GET_CLIENTS,
      //     data: {
      //       clients: clients.filter((client) => client.id !== deleteClient.id),
      //     },
      //   });
      // },
    });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className={"btn btn-danger btn-sm"} onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
