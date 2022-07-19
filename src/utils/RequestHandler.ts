type jsonType = {
    data: any,
    message: string,
    status: number
}

const jsonResponse: jsonType = {
    data: [],
    message: "",
    status: 200
}

export const requestHandler = (data: any, message: string, status: number) => {
    jsonResponse["data"] = data;
    jsonResponse["message"] = message;
    jsonResponse["status"] = status;

    return jsonResponse
}