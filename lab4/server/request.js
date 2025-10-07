function sendRequest() {
    const name = document.getElementById("name").value;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000");
    xhr.send("name=" + name);
    xhr.onload = () => {
        let response = xhr.responseText;
        document.getElementById("result").innerHTML = response;
    };
}

exports.sendRequest = sendRequest;