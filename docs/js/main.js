"use strict";

import {
	chart1
} from "./chart1.js";
import {
	chart2
} from "./chart2.js";
import {
	chart3
} from "./chart3.js";
import {
	observeScroll
} from "./scroll.js";

function bootstrapp() {



	observeScroll(
		[{
			id: 'section2',
			callback: () => {
				chart1();
			}
		}, {
			id: 'section4',
			callback: () => {
				chart2();
			}
		}, {
			id: 'section3',
			callback: () => {
				chart3();
			}
		}]
	);
}

document.addEventListener("DOMContentLoaded", bootstrapp());
