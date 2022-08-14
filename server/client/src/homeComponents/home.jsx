import React, {Component} from 'react';
import Greet from "./greet";
import TypeWriterC from "./typewriter";
import Cards from "./cards";
import Footer from "./footer";

export default function Home() {
        return (
            <React.Fragment>
                <Greet/>
                <TypeWriterC/>
                <Cards/>
                <Footer/>
            </React.Fragment>
        );
}