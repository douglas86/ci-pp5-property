// 3rd party
import Table from "react-bootstrap/Table";

// atomic design
import MapToTableHead from "../../molecule/MapToTableHead";
import MapToTableBody from "../../molecule/MapToTableBody";

// styling
import styles from "../../../styles/components/organism/Admin.module.css";

const DataTable = ({ heading, body }) => {
  return (
    <div className={styles.table}>
      <Table responsive>
        <thead>
          <MapToTableHead heading={heading} />
        </thead>
        <tbody>
          <MapToTableBody body={body} />
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
