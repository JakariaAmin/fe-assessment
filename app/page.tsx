import React from "react";
import {Col, Row} from 'antd';
import Autocomplete from "@/components/Forms/Inputs/Search/Autocomplete/index";
import GoogleMapContainer from "@/components/GoogleMap";
import styles from "./page.module.css";

const Page = () => {
  return (
    <main className = {styles.main}>
      <Row>
        <Col span = {24} style = {{display: "flex", flexDirection: "column", height: "auto"}}>

          <div style = {{textAlign: "center"}}>
            <p style = {{fontSize: 20}}>Welcome to FE assessment</p>
            <br/>
            <p>Enter your desired address.</p>
          </div>
          <br/>

          <Autocomplete/>

          <GoogleMapContainer/>
        </Col>
      </Row>
    </main>
  );
}

export default Page;
