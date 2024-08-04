import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const editFood = (item) => {
    setEditingItem(item._id);
    setFormData({ name: item.name, category: item.category, price: item.price });
  };

  const saveEdit = async () => {
    try {
      const response = await axios.post(`${url}/api/food/edit`, { ...formData, id: editingItem });
      if (response.data.success) {
        toast.success('Item updated successfully');
        setEditingItem(null);
        await fetchList();
      } else {
        toast.error('Error updating item');
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt="" />
            {editingItem === item._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleEditChange}
                />
                <div className="actions">
                  <FontAwesomeIcon
                    icon={faSave}
                    className="cursor"
                    onClick={saveEdit}
                  />
                </div>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <div className='actions'>
                  <FontAwesomeIcon icon={faEdit} className='cursor' onClick={() => editFood(item)} />
                  <FontAwesomeIcon icon={faTrash} className='cursor' onClick={() => removeFood(item._id)} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;