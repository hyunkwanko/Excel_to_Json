function doit(type, fn, dl) { // write
    var elt = document.getElementById('data-table');
    var wb = XLSX.utils.table_to_book(elt, {sheet:"Test"});

    return dl ?
    XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
    XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')));
}


var input_dom_element = document.getElementById("file");

function process_wb(wb) {
	var first_sheet_name = wb.SheetNames[2]; // Sheet 1
	var worksheet = wb.Sheets[first_sheet_name];
	var address_of_cell = {c:1, r:4};
	/* if an A1-style address is needed, encode the address */
	var cell_ref = XLSX.utils.encode_cell(address_of_cell);
	// console.log(cell_ref);

	/* Get worksheet */
	
	// console.log(worksheet['!merges'][0]);
	// console.log(worksheet['!merges'].length);
	// console.log(worksheet['!merges'][0].e.c);
	// var address_of_cell = worksheet['!merges'][0];
	// console.log(worksheet[address_of_cell]);

	/* Find desired cell */
	var desired_cell = worksheet[address_of_cell];
	// console.log(desired_cell);

	/* Get the value */
	var desired_value = (desired_cell ? desired_cell.v : undefined);
	// console.log(desired_value);

	document.getElementById("container").innerHTML = desired_value;

	var ws = wb.Sheets[wb.SheetNames[2]];
	// console.log(ws);
	/* loop through every cell manually */
	var range = XLSX.utils.decode_range(ws['!ref']); // get the range
	// console.log(range);

	// for(var R = range.s.r; R <= range.e.r; ++R) {
	// 	for(var C = range.s.c; C <= range.e.c; ++C) {
	// 		/* find the cell object */
	// 		console.log('Row : ' + R);
	// 		console.log('Column : ' + C);
	// 		var cellref = XLSX.utils.encode_cell({c:C, r:R}); // construct A1 reference for cell
	// 		if(!ws[cellref]) continue; // if cell doesn't exist, move on
	// 		var cell = ws[cellref];
	// 		console.log(cell.v);

	// 		// if (cell.v == "금액"){ // (4, 28)
	// 		// 	console.log('Row : ' + R);
	// 		// 	console.log('Column : ' + C);
	// 		// 	console.log(cell);
	// 		// }else if (cell.v == "합 계"){ // (11, 0)
	// 		// 	console.log('Row : ' + R);
	// 		// 	console.log('Column : ' + C);
	// 		// 	console.log(cell);
	// 		// }
	// 	}
	// }

	var data = new Array(); // 배열 선언
	var i = 0;

	for(var R = 5; R <= 10; ++R) {
		for(C = 0; C <= 31; ++C) {
			/* find the cell object */
			// console.log('Row : ' + R);
			// console.log('Column : ' + C);
			var cellref = XLSX.utils.encode_cell({c:C, r:R}); // construct A1 reference for cell
			if(!ws[cellref]) continue; // if cell doesn't exist, move on
			var cell = ws[cellref];
			
			data[i] = cell.v;
			i += 1;
			console.log(cell.v);
		}
	};

	for(var j = 0; j <= i; j++){
		console.log(data[j]);
	}
	
	// var html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table", editable: true });
	// document.getElementById("container").innerHTML = html_string;

	// var ws = wb.Sheets[wb.SheetNames[1]];
	// var html_string = XLSX.utils.sheet_to_html(ws, { id: "data-table1", editable: true });
	// document.getElementById("container1").innerHTML = html_string;
}

function handle_ie() {
	var path = input_dom_element.value;
	var data = IE_LoadFile(path);
	var wb = XLSX.read(data, {type:'binary'});
	process_wb(wb);
}

function handle_fr(e) {
	var files = e.target.files, f = files[0];
	var reader = new FileReader();
	var rABS = !!reader.readAsBinaryString;
	reader.onload = function(e) {
		var data = e.target.result;
		if(!rABS) data = new Uint8Array(data);
		var wb = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
		process_wb(wb);
	};
	if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
}

var handler = typeof IE_LoadFile !== 'undefined' ? handle_ie : handle_fr;

if(input_dom_element.attachEvent) input_dom_element.attachEvent('onchange', handler);
else input_dom_element.addEventListener('change', handler, false);

function tableau(pid, iid, fmt, ofile) {
	if(typeof Downloadify !== 'undefined') Downloadify.create(pid,{
		swf: 'downloadify.swf',
		downloadImage: 'download.png',
		width: 100,
		height: 30,
		filename: ofile, data: function() { return doit(fmt, ofile, true); },
		transparent: false,
		append: false,
		dataType: 'base64',
		onComplete: function(){ alert('Your File Has Been Saved!'); },
		onCancel: function(){ alert('You have cancelled the saving of this file.'); },
		onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); }
	}); else document.getElementById(pid).innerHTML = "";
}
tableau('biff8btn', 'xportbiff8', 'biff8', 'test.xls');
tableau('odsbtn',   'xportods',   'ods',   'test.ods');
tableau('fodsbtn',  'xportfods',  'fods',  'test.fods');
tableau('xlsbbtn',  'xportxlsb',  'xlsb',  'test.xlsb');
tableau('xlsxbtn',  'xportxlsx',  'xlsx',  'test.xlsx');

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36810333-1']);
_gaq.push(['_setDomainName', 'sheetjs.com']);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
