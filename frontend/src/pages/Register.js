import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Adjust the registration endpoint URL based on your setup
      const response = await axios.post('http://localhost:3000/auth/register', data);
      console.log(response);
      
      // Handle success or redirect the user to the next step
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      console.log(error.response.status)
      // Handle registration error (show error message, redirect, etc.)
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            User Type:
            <select name="userType" {...register("userType", { required: true })}>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.userType && <p style={{color:"red"}}>{errors}</p>}
          </label>
        </div>

        <div>
          <label>
            First Name:
            <input type="text" name="firstName" {...register("firstName", { required: true })} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </label>
        </div>

        <div>
          <label>
            Last Name:
            <input type="text" name="lastName" {...register("lastName", { required: true })} />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </label>
        </div>

        <div>
          <label>
            Username:
            <input type="text" name="username" {...register("username", { required: true })} />
            {errors.username && <p>{errors.username.message}</p>}
          </label>
        </div>

        <div>
          <label>
            Email:
            <input type="email" name="email" {...register("email", { required: true })} />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
        </div>

        <div>
          <label>
            Password:
            <input type="password" name="password" {...register("password", { required: true })} />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
        </div>

        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
