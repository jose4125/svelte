export const fetchData = ({ data = {}, method = 'GET', id, cb }) => {
  const url = 'https://svelte-course-jd-default-rtdb.firebaseio.com/meetups';
  const urlExtension = '.json';
  let completeUrl = `${url}${urlExtension}`;

  let config = {};
  const headers = {
    contentType: 'application/json',
  };

  if (method === 'PATCH' || method === 'DELETE') {
    completeUrl = `${url}/${id}${urlExtension}`;
  }

  if (method === 'DELETE') {
    config = {
      method,
    };
  }

  if (Object.keys(data).length) {
    config = {
      method,
      body: JSON.stringify(data),
      headers,
    };
  }

  return fetch(completeUrl, config)
    .then(res => {
      if (!res.ok) {
        throw new Error('An error ocurred, please try again');
      }
      return res.json();
    })
    .then(data => {
      if (data && id) {
        cb({ data, id });
        return;
      }
      if (data) {
        cb({ data });
        return;
      }
      if (id) {
        cb({ id });
      }
    })
    .catch(err => {
      cb({ error: err });
    });
};
