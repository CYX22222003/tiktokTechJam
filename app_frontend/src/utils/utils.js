export async function AIActionCall(data) {
    const address = process.env.AIActionCall;
    const res = await fetch(address?? "", {
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