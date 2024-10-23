import { button } from "../atom";

const MapToTableBody = ({ body }) => {
  return (
    <tr>
      {body.map((items, index) => (
        <td key={index}>{items}</td>
      ))}
      <td>{button(() => console.log("View"), "View", "outline-info")}</td>
      <td>
        {button(() => console.log("Update"), "Update", "outline-success")}
      </td>
      <td>{button(() => console.log("Delete"), "Delete", "outline-danger")}</td>
    </tr>
  );
};

export default MapToTableBody;
