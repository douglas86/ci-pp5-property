import { button } from "../atom";
import Image from "react-bootstrap/Image";

const MapToTableBody = ({ body }) => {
  console.log("body", body);

  return (
    <>
      {body
        ? Object.values(body).map((items) => (
            <tr key={items.id}>
              <td>{items.id}</td>
              <td>
                <Image
                  src={items.profile_picture}
                  width={50}
                  height={50}
                  roundedCircle
                />
              </td>
              <td>{items.user}</td>
              <td>{items.address}</td>
              <td>{items.area_code}</td>
              <td>{items.role}</td>
              <td>£ {items.rent}</td>
              <td>
                {button(() => console.log("View"), "View", "outline-info")}
              </td>
              <td>
                {button(
                  () => console.log("Update"),
                  "Update",
                  "outline-success",
                )}
              </td>
              <td>
                {button(
                  () => console.log("Delete"),
                  "Delete",
                  "outline-danger",
                )}
              </td>
            </tr>
          ))
        : null}
    </>

    // <tr>
    //   {body.map((items, index) => (
    //     <td key={items}>{items}</td>
    //   ))}
    //   <td>{button(() => console.log("View"), "View", "outline-info")}</td>
    //   <td>
    //     {button(() => console.log("Update"), "Update", "outline-success")}
    //   </td>
    //   <td>{button(() => console.log("Delete"), "Delete", "outline-danger")}</td>
    // </tr>
  );
};

export default MapToTableBody;
