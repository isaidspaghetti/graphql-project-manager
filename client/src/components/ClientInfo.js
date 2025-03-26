import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

export default function ClientInfo({ client }) {
  if (!client) {
    return (
      <>
        <h4 className={"mt-5"}>Client</h4>
        <p className={"lead m-3"}> Client Info Not yet added</p>
      </>
    );
  }

  return (
    <>
      <h5 className={"mt-5"}>Client</h5>
      <ul className={"list-group"}>
        <li className={"list-group-item"}>
          <FaIdBadge className={"icon"} />
          {client.name}
        </li>
        <li className={"list-group-item"}>
          <FaPhone className={"icon"} />
          {client.phone}
        </li>
        <li className={"list-group-item"}>
          <FaEnvelope className={"icon"} />
          {client.email}
        </li>
      </ul>
    </>
  );
}
