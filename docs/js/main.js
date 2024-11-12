"use strict";

import { chart1 } from "./chart1.js";
import { chart2 } from "./chart2.js";
import { chart3 } from "./chart3.js";

function bootstrapp(){
		chart1();
		chart2();
		chart3();
	}

document.addEventListener("DOMContentLoaded", bootstrapp());
