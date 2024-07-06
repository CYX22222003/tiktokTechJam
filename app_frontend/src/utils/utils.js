export async function AIActionCall(data) {
    const address = "/application/aipost/";
    const res = await fetch(address, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        },
        body: JSON.stringify(data)
    }).then((data) => {
        if (data.status !== 200) {
            throw new Error("Fail to generate AI call");
        }
        return data;
    }).catch((err) => {
        throw new Error(err);
    })

    return res;
}

export async function deleteActionCall(id) {
    const address = "/application/delete/" + id;
    const res = await fetch(address, {
        method: "DELETE",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        }
    }).then((data) => {
        if (data.status !== 200) {
            throw new Error("Fail to generate AI call");
        }
        return data;
    }).catch((err) => {
        throw new Error(err);
    })

    return res;
}

export function downloadFileFromBrowser(blob) {
   const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      "Downloads" + blob.type
    );
    document.body.appendChild(link);

    link.click();

    if(link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
}

export const downloadAIResponse = (response) => {
  const newFile = new Blob(
      [response], 
      {
        type : "application/msword"
      }
  );
  downloadFileFromBrowser(newFile)
}

export async function getHistoryData() {
  const address = "/application/basic/"

  const res = await fetch(address, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        }
    }).then((data) => {
        if (data.status !== 200) {
            throw new Error("Fail to generate AI call");
        }
        return data.json();
    }).catch((err) => {
        throw new Error(err);
    })

    return res["documents"];
}

export async function AIActionCallExist(id) {
    const address = "/application/aiget/" + id

  const res = await fetch(address, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
            "Content-Type" : "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        }
    }).then((data) => {
        if (data.status !== 200) {
            throw new Error("Fail to generate AI call");
        }
        return data.json();
    }).catch((err) => {
        throw new Error(err);
    })

    return res["AIResponse"];
}