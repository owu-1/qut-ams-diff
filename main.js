function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

const console_element = document.getElementById("MainContent_ConsoleOutput_")
// Heading
let errors_heading = document.createElement("p")
errors_heading.className = "heading"
errors_heading.textContent = "Errors:"
insertAfter(console_element, errors_heading)
// Exercise Box
let errors_exercisebox = document.createElement("div")
errors_exercisebox.className = "exerciseBox"

const matches = console_element.textContent.matchAll(/<Expected>(.*?)<\/Expected>\n+<Actual>(.*?)<\/Actual>/gs)


for (const match of matches) {
    console.log("test")
    const expected = match[1]
    const actual = match[2]

    let diff_holder = document.createElement("div")

    const patch = Diff.createPatch("fileName", expected, actual, "file", "file")
    const diff2htmlUi = new Diff2HtmlUI(diff_holder, patch, {
        fileListToggle: false,
        fileContentToggle: false
    })
    diff2htmlUi.draw()
    diff2htmlUi.highlightCode()

    errors_exercisebox.appendChild(diff_holder)
}

insertAfter(errors_heading, errors_exercisebox)