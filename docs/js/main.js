"use strict";

import { chart1 } from "./chart1.js";
import { chart2 } from "./chart2.js";
import { chart3 } from "./chart3.js";

class Bootstrapper {
	static start() {
		chart1();
		chart2();
		chart3();
	}
}

document.addEventListener("DOMContentLoaded", Bootstrapper.start);





