export async function getAll(type) {
  try {
    const result = (
      await fetch(
        `/${type}`,
      )
    ).json();

    return result;
  } catch (err) {
    return err.message;
  }
}
export async function getByTypeAndId(type, id) {
  try {
    const res = (await fetch(`/${type}/${id}`)).json();
    return res;
  } catch (err) {
    return err.message;
  }
}
export async function setByTypeAndId(type, obj) {
  try {
    const res = (await fetch(
      `/${type}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(obj).replace(/\\n/g, ' ').replace(';', ','),
      },
    )).json();

    return res;
  } catch (err) {
    return err.message;
  }
}
export async function updateByTypeAndId(type, id, obj) {
  try {
    const res = (await fetch(
      `/${type}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(obj).replace(/\\n/g, ' ').replace(';', ','),
      },
    ));

    return res;
  } catch (err) {
    return err.message;
  }
}
export async function deleteByTypeAndId(type, id) {
  try {
    const res = (await fetch(
      `/${type}/${id}`,
      {
        method: 'DELETE',
      },
    ));

    return res;
  } catch (err) {
    return err.message;
  }
}
