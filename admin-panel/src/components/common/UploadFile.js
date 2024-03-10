import React, { useState } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useSelector } from "react-redux";

function UploadFile(user) {
    const [image, setImage] = useState(null);
    const {user: currentUser} = useSelector(state => state.auth)

    const handleImageChange = (e)=>{
        const selectedFile =  e.target.files[0]
        setImage(e.target.files[0])

        if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
        setImage(selectedFile);
    } else {
      alert('Please select an image file that is less than or equal to 2MB.');
    }
    }

    const uplaod = async(e) =>{
        e.preventDefault()
    try {
      const formData = new FormData();
      if(image){
        formData.append(`avatar`, image);
      }
      else{
      return alert('Upload image. Please try again.');
      }

      const token = authHeader()
      console.log(token)
      await axios.post('http://localhost:5000/api/user/upload-avatar', formData, {
        headers: 
        //   'Content-Type': 'multipart/form-data',
          token
        ,
        params:{userId:currentUser.user.id},
      }).then((res)=>{console.log(res)})

      return alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      return alert('Error uploading image. Please try again.');
    }
    }
  return (
    <div>
      <div className="upload-profile-picture">
        <form action="" onSubmit={(e)=>uplaod(e)} encType="multipart/form-data">
          <label htmlFor="upload">Upload Profile Picture</label>
          <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  accept="image/*"
                  onChange={(e)=>handleImageChange(e)}
                  name={currentUser.user.id}
                />
                <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  )
}

export default UploadFile


