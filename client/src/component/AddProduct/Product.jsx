import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // 👈 image preview

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/product/add", formData);
      toast.success("Item Added");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // 👈 preview URL set
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleForm} encType="multipart/form-data" method="post">
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
            name="image"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            name="brand"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductAdd;
