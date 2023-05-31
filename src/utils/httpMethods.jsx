export const postMethod = async (url, data)=>{
    //config of requestOptions to fetch
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //fecth
    try {
      const response = await fetch(url,requestOptions);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  export const postMethodBody = async (url, data)=>{
    //config of requestOptions to fetch
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    const requestOptions = {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    };
    //fecth
    try {
      const response = await fetch(url,requestOptions);
      return response;
    } catch (err) {
      console.error(err);
    }
  };