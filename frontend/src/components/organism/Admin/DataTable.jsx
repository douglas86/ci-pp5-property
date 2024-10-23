import Table from "react-bootstrap/Table";

import styles from "../../../styles/components/organism/Admin.module.css";
import { button } from "../../atom";

const DataTable = ({ heading, body }) => {
  return (
    <div className={styles.table}>
      <Table responsive>
        <thead>
          <tr>
            {heading.map((items, index) => (
              <th key={index}>{items}</th>
            ))}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {body.map((items, index) => (
              <td key={index}>{items}</td>
            ))}
            <td>{button(() => console.log("View"), "View", "outline-info")}</td>
            <td>
              {button(() => console.log("Update"), "Update", "outline-success")}
            </td>
            <td>
              {button(() => console.log("Delete"), "Delete", "outline-danger")}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
