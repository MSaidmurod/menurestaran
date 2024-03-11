import React from "react";
import SetDatabase from "../firebase/firebase_config";
import { ref, set, get, update, remove, child } from "firebase/database";

export class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: "",
      chekId: "0002",
      customerId: "001212",
      givePermission: "0",
    };

    this.interfase = this.interfase.bind(this);
  }
  componentDidMount() {
    this.setState({
      db: SetDatabase(),
    });
  }
  render() {
    let deta = 120222;
    this.setState({ customerId: deta });
    return;
  }

  interfase(e) {
    let id = e.target.id;
    if (id == "addbtn") {
      this.insertData();
    }
  }

  getAllInput() {
    return {
      username: this.state.customerId,
    };
  }

  insertData() {
    const db = this.state.db;
    const data = this.getAllInput();

    set(ref(db, "Customer/" + data.username), {
      FulllName: data.username,
    });
  }
}
