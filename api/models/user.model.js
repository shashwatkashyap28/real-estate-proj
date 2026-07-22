import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default: "https://imgs.search.brave.com/pekBFfEBfmZ5mpETqCk6h5lVaECe_fHVPT_Je3dixgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2J1c2luZXNz/LW1hbi1hdmF0YXIt/cHJvZmlsZV8xMTMz/MjU3LTI0MzEuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw"
    },
    // Add this field alongside username, email, password, avatar:
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;