const initObject = (method, obj) => ({
  method: `${method}`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(obj).replace(/\\n/g, ' ').replace(';', ','),
});
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
export async function setByType(type, obj, method) {
  try {
    const res = (await fetch(
      `/${type}`,
      initObject(method, obj),
    )).json();

    return res;
  } catch (err) {
    return err.message;
  }
}
export async function updateByTypeAndId(type, id, obj, method) {
  try {
    const res = (await fetch(
      `/${type}/${id}`,
      initObject(method, obj),
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
