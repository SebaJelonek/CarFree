interface PostBody {
  body: {
    brand: string;
    milage: number;
    model: string;
    year: number;
    companyDate: Date;
  };
}

const onPost = async (
  event: React.FormEvent<HTMLFormElement>,
  url: string,
  body: PostBody['body']
) => {
  event.preventDefault();

  const fetchFunction = () => {
    const response = async () => {
      const data = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ body }),
      });
      return data.json();
    };
    return response();
  };
  const data = await fetchFunction();
  return data.message;
};

const onGet = async (url: string, event?: React.FormEvent<HTMLFormElement>) => {
  if (event !== undefined) {
    event.preventDefault();
    const fetchFunction = () => {
      const response = async () => {
        const data = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });
        return data.json();
      };
      return response();
    };
    const data = await fetchFunction();
    return data;
  } else {
    const fetchFunction = () => {
      const response = async () => {
        const data = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });
        return data.json();
      };
      return response();
    };
    const data = await fetchFunction();
    return data;
  }
};

export { onPost, onGet };
