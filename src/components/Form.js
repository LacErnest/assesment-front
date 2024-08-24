import React, { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { createMenu, updateMenu } from "../Api";
import { useAppContext } from "../context/UseAppContext";
import { toast } from "react-toastify";

function Form({ item }) {
  const { refresh, setRefresh } = useAppContext();
  const [data, setData] = useState({
    depth: item.depth,
    name: item.name,
  });

  const [load, setLoad] = useState(false);

  const handleChange = (val, key) => {
    setData({ ...data, [key]: val });
  };
  const handleAdd = (event) => {
    event.preventDefault();
    setLoad(true);

    if (item.id) {
      createMenu({ parent: item.id, name: data.name })
        .then((res) => {
          if (res && res.status === 201) {
            toast.success("Menu created !");
            setRefresh(!refresh);
          } else {
            console.log(res.data)
            toast.error("Error:"+ res.data?.name);
          }
        })
        .catch((err) => toast.error("Error: " + err.message))
        .finally(() => setLoad(false));
    }
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    setLoad(true);

    if (item.id) {
      updateMenu(item.id, data)
        .then((res) => {
          if (res && res.status === 200) {
            toast.success("Menu updated !");
            setRefresh(!refresh);
          } else toast.error("Error: "+ res.data?.name);
        })
        .catch((err) => toast.error("Error: " + err.message))
        .finally(() => setLoad(false));
    }
  };
  useEffect(() => {
    setData({
      depth: item.depth,
      name: item.isAdd ? "" : item.name,
    });
  }, [item]);

  return (
    <div className="form-container">
      <form onSubmit={item?.isAdd ? handleAdd : handleUpdate}>
        <div className="form-group">
          <label>Menu ID:</label>
          <input type="text" value={item.isAdd ? "" : item.id} readOnly />
        </div>
        <div className="form-group">
          <label>Depth:</label>
          <input
            type="number"
            required
            onChange={(e) => handleChange(e.target.value, "depth")}
            value={data.depth}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Parent Data:</label>
          <input
            type="text"
            value={item?.isAdd ? item.name : item.parent}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            required
            onChange={(e) => handleChange(e.target.value, "name")}
            value={data.name}
          />
        </div>
        <button type="submit" disabled={load}>
          Save {load && <ImSpinner />}
        </button>
      </form>
    </div>
  );
}

export default Form;
