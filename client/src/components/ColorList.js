import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import { base_url } from "./base_url";

const initialColor = {
  color: "",
  hex: "",
};

const ColorList = ({ colors, updateColors, reorderColors, logout }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    hex: "",
  });

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`${base_url}/api/colors`, newColor)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        updateColors([
          ...colors,
          {
            id: response.data.colorId,
            color: newColor.color,
            hex: newColor.hex,
          },
        ]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setNewColor({
          color: "",
          hex: "",
        });
      });
  };

  const handleAddColor = (e) => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value,
    });
  };

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`${base_url}/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        updateColors(
          colors.map((color) => {
            if (color.id === response.data.color.id) {
              return response.data.color;
            } else {
              return color;
            }
          })
        );
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setEditing(false);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`${base_url}/api/colors/${color.id}`)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        updateColors(colors.filter((listColor) => listColor.id !== color.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div className="color-box" style={{ backgroundColor: color.hex }} />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  hex: e.target.value,
                })
              }
              value={colorToEdit.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form className="add-bubbles" onSubmit={addColor}>
        <legend>Add color</legend>
        <label>
          color name:
          <input
            type="text"
            name="color"
            value={newColor.color}
            onChange={handleAddColor}
            placeholder="Color Name"
            required
          />
        </label>
        <label>
          hex code:
          <input
            type="text"
            name="hex"
            value={newColor.hex}
            onChange={handleAddColor}
            placeholder="Color Value"
            required
          />
        </label>
        <div className="button-row">
          <button type="submit">Add New Color</button>
        </div>
      </form>
      <div className="reorder">
        <button onClick={reorderColors}>Reload Bubbles!</button>
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default ColorList;
