
function indentLevel(line){
	index = 0
	while(line.charAt(index) == '\t' || line.charAt(index) == ' '){
		index++;
	}
	return index
}

function removeIndent(line, level){
	return line.substr(level)
}

function parse(input){
	
	// if you get an empty input, just return an empty array
	if(input == "" ){
		return new Array()
	}

	var array = input.split("\n")

	var returnArray = []
	var index = 0
	while(index < array.length){
		content = array[index]

		//inner content holds the text in the next indent level stripped of one indent
		innerContent = ""
		//start from the next line
		index++
		//holds the indent length itself (catches for tabs or spaces.)
		indentLength = 1
		if(index < array.length){
			indentLength = indentLevel(array[index])
		}
		while(index < array.length && indentLevel(array[index]) > 0){
			innerContent += removeIndent(array[index], indentLength) + "\n"
			index++
		}
		if(content != ''){
			returnArray.push({"content" : content, "inner" : parse(innerContent)})
		}
	}
	return returnArray

}

module.exports = parse