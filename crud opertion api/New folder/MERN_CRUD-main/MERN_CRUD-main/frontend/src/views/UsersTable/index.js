// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Table Import
import Table from "./usersTable";

const Users = () => {
  return (
    <Fragment>
      <h4 style={{ textAlign: "center", margin: "30px auto" }}>USER LIST</h4>

      <Card>
        <div className="card-datatable app-user-list table-responsive">
          <Table />
        </div>
      </Card>
    </Fragment>
  );
};

export default Users;
