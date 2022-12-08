import embed from "vega-embed";
import {spec} from "./spec";
import "./style.css";

embed("#app", spec, {renderer: "svg"});