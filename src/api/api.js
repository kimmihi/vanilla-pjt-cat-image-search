const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

export const getCatItem = async (id) => {
  const responseData = await fetch(`${API_ENDPOINT}/api/cats/${id}`);

  const data = responseData.json();

  return data;
};

export const getCatImages = async (keyword) => {
  const responseData = await fetch(
    `${API_ENDPOINT}/api/cats/search?q=${keyword}`
  );

  const data = responseData.json();

  return data;
};
